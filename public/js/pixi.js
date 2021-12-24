import calcCommentRow from "./modules/calcCommentRow.js";

const commentList = [];
class Comment {
    // Comment クラスの配列

    constructor(pixiInstance, move) {
        this.pixiInstance = pixiInstance; // Text のインスタンス
        this.move = move; // 1 フレームの移動量
    }

    // フレームの更新処理
    render() {
        this.pixiInstance.position.x -= this.move;
    }
}


const app = new PIXI.Application({
    width: commentMoveWidth,
    height: document.documentElement.clientHeight,
    transparent: true, // 背景を透明にする
});
document.body.appendChild(app.view);

const style = new PIXI.TextStyle({
    textBaseline: "bottom", // 高さの変更が出来る
    fontFamily: "Segoe UI Emoji, MS P ゴシック",
    fontSize: 80,
    fontWeight: 900,
    fill: 0xFFFFFF, // テキストの色
    strokeThickness: 15, // テキストの縁取りの幅
    lineJoin: "round", // 縁取りの結合部
    stroke: 0x000000, // テキストの縁取りの色
});

const scoreText = new PIXI.Text('score: 0', style);
const textMetrics = PIXI.TextMetrics.measureText('score: 0', style);
console.log(scoreText.width);

let x = commentMoveWidth;
scoreText.position.x = x; // scoreText の x 座標
scoreText.position.y = 0; // scoreText の y 座標
app.stage.addChild(scoreText);

const socket = io();

// 接続時の処理
socket.on('connect', () => {
    console.log("socket.ioに接続しました");
});

// サーバーからのメッセージ拡散に対する処理
socket.on('spread message', (strMessage) => {
    // OPENRECのコメントがスタンプの場合は処理しない
    if (strMessage.length == 0) return;

    // 流れるコメントの作成
    const [message, comment, index] = calcCommentRow(strMessage);
    if (!message) return;
    const text = new PIXI.Text(strMessage, style);
    text.position.x = commentMoveWidth
    text.position.y = commentHeight * index
    app.stage.addChild(text)
    const speed = Math.floor(comment.speed * 1000 / 60)
    commentList.push(new Comment(text, speed))
});

// x 座標の移動
const render = () => {
    commentList.forEach(instance => {
        instance.render();
        if (instance.pixiInstance.position.x < -instance.pixiInstance.width - 1000) {
            commentList.shift();
            return;
        }
    });
    requestAnimationFrame(render);
}

requestAnimationFrame(render);