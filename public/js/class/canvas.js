import { DisplayProperty } from "./displayProperty.js";

class Comment {
    // コメントの文字列
    #text;
    // コメントの x 座標
    #x;
    // コメントの y 座標
    #y;
    // コメントが 1 回の更新でどれだけ進むか
    #move;
    constructor(text, x, y, move) {
        this.#text = text;
        this.#x = x;
        this.#y = y;
        this.#move = move;
    }

    update() {
        this.#x -= this.#move;
    }

    render(context) {
        context.strokeText(this.#text, this.#x, this.#y);
        context.fillText(this.#text, this.#x, this.#y);
    }
}

class CanvasState extends DisplayProperty {
    // フレームレート
    #fps;
    // canvas の情報を保持
    #canvas
    // テキストの設定を保持
    #context;
    // 画面に流すコメントの配列
    #commentList;
    constructor(commentLane, commentDisplayTime) {
        super(commentLane, commentDisplayTime);
        /**
        * @type {HTMLCanvasElement}
        */
        this.#canvas = document.getElementById('placeholder');
        this.#context = this.#canvas.getContext('2d')

        const height = Math.floor(this.#canvas.height / this.getCommentLane());
        this.#context.textBaseline = "top";
        this.#context.textAlign = "end"
        this.#context.font = `900 ${height}px Segoe UI Emoji`;
        this.#context.fillStyle = "white";
        // 縁取り部分のテキストを尖らないようにする
        this.#context.lineJoin = "round";
        this.#context.lineWidth = 13;
        this.#fps = 60;
        this.#commentList = [];
    }

    #measureStringWidth(comment) {
        return Math.round(this.#context.measureText(comment).width);
    }

    createComment(commentMessage) {
        const { comment, index } = this.calcCommentRow(commentMessage, this.#measureStringWidth(commentMessage));
        if (!comment) return;
        const [commentMoveWidth, commentHeight] = this.getWindowSize();
        const moveWidth = commentMoveWidth + comment.width;
        const move = comment.speed * 1000 / this.#fps;
        this.#commentList.push(new Comment(commentMessage, moveWidth, commentHeight * index, move));

    }

    drawNextFrame() {
        // Canvas 画面のクリア
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        // コメントを１フレーム進める処理
        this.#commentList.forEach(comment => {
            comment.update();
            if (comment.x <= 0) this.#commentList.shift();
            comment.render(this.#context);
        });
    }

    getFps() {
        return this.#fps;
    }
}

export { Comment, CanvasState };