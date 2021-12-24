import calcCommentRow from "./modules/calcCommentRow.js";
import { Comment } from "./class/pixi-comment.js";

const commentList = [];

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
    text.position.x = commentMoveWidth // scoreText の x 座標
    text.position.y = commentHeight * index // scoreText の y 座標
    app.stage.addChild(text)
    let speed = Math.floor(comment.speed * 1000 / 60)
    console.log(speed)
    commentList.push(new Comment(text, speed))
});

// フレーム毎の x 座標の移動
const render = () => {
    commentList.forEach(instance => {
        instance.render(commentList);
    });
    requestAnimationFrame(render);
}

requestAnimationFrame(render);