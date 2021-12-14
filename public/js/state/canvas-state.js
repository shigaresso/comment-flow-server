// import { Comment } from "../class/comment";

class Comment {
    constructor(text, x, y, move) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.move = move;
    }

    update() {
        this.x -= this.move;
    }

    render(context) {
        context.strokeText(this.text, this.x, this.y);
        context.fillText(this.text, this.x, this.y);
    }
}

/**
* @type {HTMLCanvasElement}
*/
const canvas = document.getElementById('placeholder');
let context = canvas.getContext('2d');

const fps = 60;
const height = Math.floor(canvas.height / windowDevided);
context.textBaseline = "top";
context.textAlign = "end"
context.font = `900 ${height}px Segoe UI Emoji`;
context.fillStyle = "white";
// 縁取り部分のテキストを尖らないようにする
context.lineJoin = "round";
context.lineWidth = 13;

const commentDisplayTime_ms = 5000;
const commentList = [];

// コメント作成時に描画出来るか確認するための情報
const rowProperties = Array(windowDevided)
    .fill()
    .map(e => ({
        bornTime: 0,
        speed: 0,
        width: 0,
    }));

const drawNextFrame = () => {
    // Canvas 画面のクリア
    context.clearRect(0, 0, canvas.width, canvas.height);
    // コメントを１フレーム進める処理
    commentList.forEach(comment => {
        comment.update();
        if (comment.x <= 0) commentList.shift();
        comment.render(context);
    });
}


const createCommentForCanvas = (comment) => {
    // コメントを流す場合に流す行を更新するのに必要なプロパティ
    const tempCommentProperty = {
        bornTime: Date.now(),
        width: Math.floor(context.measureText(comment).width),
    }
    const moveWidth = canvas.width + tempCommentProperty.width;
    tempCommentProperty.speed = moveWidth / commentDisplayTime_ms;
    for (let i = 0; i < windowDevided; i++) {
        let timeLag = tempCommentProperty.bornTime - rowProperties[i].bornTime;
        let relativeSpeed = tempCommentProperty.speed - rowProperties[i].speed;
        let rowCommentRightSide = rowProperties[i].speed * timeLag - rowProperties[i].width;
        let collisionWidth = relativeSpeed * (commentDisplayTime_ms - timeLag) - rowCommentRightSide;

        if (timeLag >= commentDisplayTime_ms || rowCommentRightSide >= 0 && collisionWidth <= 0) {
            // コメント作成作業
            const move = 1000 * moveWidth / commentDisplayTime_ms / fps
            console.log(moveWidth, move)
            rowProperties[i] = tempCommentProperty;
            commentList.push(new Comment(comment, moveWidth, height * i, move));
            return;
        }
    }
}


setInterval(drawNextFrame, Math.floor(1000 / fps));

const socket = io();

// 接続時の処理
socket.on('connect', () => {
    console.log("socket.ioに接続しました");
});

socket.on('spread message', (strMessage) => {
    // OPENRECのコメントがスタンプの場合は処理しない
    if (strMessage.length == 0) return;
    createCommentForCanvas(strMessage);
});