// offscreenCanvas と context は初めて worker に送った時にだけ定義したいので、宣言と初期化を分けている。
let offscreenCanvas;
let context;

const commentList = [];
const fps = 60;

onmessage = event => {
    const { pattern, canvas, comment, strMessage, commentWidth } = event.data;
    const { speed } = comment;
    /*
     * メインスレッドから、OffscreenCanvas を受け取る
     * この行以降 offscreenCanvas 変数は通常の canvas と同様の処理が出来る
     */

    switch (pattern) {
        case "constructor":
            offscreenCanvas = canvas;
            // CanvasRenderingContext2D を取得する(引数を webgl にすれば webgl を利用出来る)
            context = offscreenCanvas.getContext("2d");

            context.textBaseline = "top";
            context.textAlign = "end"
            context.font = `900 ${offscreenCanvas.height}px Segoe UI Emoji`;
            context.fillStyle = "white";
            // 縁取り部分のテキストを尖らないようにする
            context.lineJoin = "round";
            context.lineWidth = 13;
            break;
        case "receiveComment":
            createComment(strMessage, commentWidth, speed);
            break;
        default:
            console.log("worker default");
    }
}

function createComment(commentMessage, commentWidth, speed) {
    const moveWidth = offscreenCanvas.width + commentWidth;
    const move = speed * 1000 / fps;
    commentList.push(new Comment(commentMessage, moveWidth, move));
}

class Comment {
    // コメントの文字列
    #text;
    // コメントの x 座標
    #x;
    // コメントの y 座標
    #y;
    // コメントが 1 回の更新でどれだけ進むか
    #move;
    constructor(text, x, move) {
        this.#text = text;
        this.#x = x;
        this.#y = 0;
        this.#move = move;
    }

    update() {
        this.#x -= this.#move;
    }

    render(context) {
        context.strokeText(this.#text, this.#x, this.#y);
        context.fillText(this.#text, this.#x, this.#y);
    }

    getCommentX() {
        return this.#x;
    }
}

function drawNextFrame() {
    // Canvas 画面のクリア
    if (context) {
        context.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
        // コメントを１フレーム進める処理
        commentList.forEach(comment => {
            comment.update();
            comment.render(context);
            if (comment.getCommentX() <= 0) commentList.shift();
        });
    }
    requestAnimationFrame(drawNextFrame);
}

requestAnimationFrame(drawNextFrame);