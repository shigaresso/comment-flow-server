// offscreenCanvas と context は初めて worker に送った時にだけ定義したいので、宣言と初期化を分けている。
let offscreenCanvas;
let context;

const commentList = [];
const fps = 60;

onmessage = event => {
    const { pattern, canvas, comment, strMessage, commentWidth } = event.data;
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
            context.textAlign = "start"
            context.font = `900 ${offscreenCanvas.height}px Segoe UI Emoji`;
            context.fillStyle = "white";
            // 縁取り部分のテキストを尖らないようにする
            context.lineJoin = "round";
            context.lineWidth = 13;
            break;
        case "receiveComment":
            const { speed } = comment;
            createComment(strMessage, commentWidth, speed);
            break;
        default:
            console.log("worker default");
    }
}

function createComment(commentMessage, commentWidth, speed) {
    const moveWidth = offscreenCanvas.width + commentWidth;
    const move = speed * 1000 / fps;
    commentList.push(new Comment(commentMessage, moveWidth, move, commentWidth, offscreenCanvas.height, context.lineWidth));
}

class Comment {
    // コメントの文字列
    #text;
    // コメントの x 座標
    #x;
    #x1;
    // コメントの y 座標
    #y;
    // コメントが 1 回の更新でどれだけ進むか
    #move;
    #width;
    #height;
    #lineWidth;
    constructor(text, x, move, width, height, lineWidth) {
        this.#text = text;
        this.#x = x;
        this.#x1 = x;
        this.#y = 0;
        this.#move = move;
        this.#width = width;
        this.#height = height;
        this.#lineWidth = lineWidth;
    }


    render(context) {
        if (this.#x >= context.width) {
            this.#x1 = context.width;
            this.#x2 = context.width+this.#lineWidth;
        }
        context.clearRect(this.#x1, this.#y, this.#width+this.#lineWidth, this.#height);
        context.strokeText(this.#text, this.#x, this.#y);
        context.fillText(this.#text, this.#x, this.#y);
        this.#x -= this.#move;
        this.#x1 -= this.#move;
        if (this.#x < this.#move) {
            this.#x1 = 0;
        }

    }

    getCommentEnd() {
        return this.#x+this.#width+this.#lineWidth;
    }
}

function drawNextFrame() {
    // Canvas 画面のクリア
    if (context) {
        // コメントを１フレーム進める処理
        commentList.forEach(comment => {
            comment.render(context);
            if (comment.getCommentEnd() <= 0) commentList.shift();
        });
    }
    requestAnimationFrame(drawNextFrame);
}

requestAnimationFrame(drawNextFrame);