import { DisplayProperty } from "../displayProperty.js";
import { CanvasComment } from "./canvasComment.js";

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
        this.#context.lineWidth = 10;

        this.#context.textBaseline = "top";
        this.#context.textAlign = "start"
        this.#context.font = `900 ${height - 4*this.#context.lineWidth}px Segoe UI Emoji`;
        this.#context.fillStyle = "white";
        // 縁取り部分のテキストを尖らないようにする
        this.#context.lineJoin = "round";
        this.#fps = 60;
        this.#commentList = [];
    }

    #measureStringWidth(comment) {
        return Math.round(this.#context.measureText(comment).width);
    }

    createComment(commentMessage) {
        // lineWidth はそのまま渡す
        const { comment, index } = this.calcCommentRow(this.#measureStringWidth(commentMessage));
        if (!comment) return;
        const { commentMoveWidth, commentHeight } = this.getWindowSize();
        const commentMoveSpeed = comment.speed * 1000 / this.getFps();
        // if (index < this.getCommentLane() / 2) {
        this.#commentList.push(new CanvasComment(commentMessage, comment.width, commentMoveWidth, commentHeight, index, commentMoveSpeed, this.#context.lineWidth));
        // }
    }

    drawNextFrame() {
        // Canvas 画面のクリア
        // this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        // コメントを１フレーム進める処理
        this.#commentList.forEach(comment => {
            // コメントのあった幅だけを削除
            if (comment.xEndPoint() < 0) this.#commentList.shift();
            comment.render(this.#context);
        });
        requestAnimationFrame(() => this.drawNextFrame());
    }

    getFps() {
        return this.#fps;
    }
}

export { CanvasState };