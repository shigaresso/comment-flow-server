import { DisplayProperty } from "../displayProperty.js";
import { CanvasComment } from "./canvasComment.js";

export const createCanvas = (domId, commentMoveWidth, rowHeight) => {
    const element = document.createElement("canvas");
    element.id = domId;
    element.className = "canvas";
    element.width = commentMoveWidth;
    element.height = rowHeight;
    document.body.appendChild(element);
}

class CanvasState extends DisplayProperty {
    // フレームレート
    #fps;
    // canvas の情報を保持
    canvas
    // テキストの設定を保持
    context;
    // 画面に流すコメントの配列
    commentList;
    constructor(commentLane, commentDisplayTime, canvasSetting) {
        super(commentLane, commentDisplayTime, canvasSetting);
        /**
        * @type {HTMLCanvasElement}
        */
        this.canvas = document.getElementById('placeholder');
        this.context = this.canvas.getContext('2d');

        const {textBaseline, textAlign, lineWidth, font, fillStyle, lineJoin} = canvasSetting;
        this.context.textBaseline = textBaseline;
        this.context.textAlign = textAlign;
        this.context.lineWidth = lineWidth;
        this.context.font = font;
        this.context.fillStyle = fillStyle;
        // 縁取り部分のテキストを尖らないようにする
        this.context.lineJoin = lineJoin;

        this.#fps = 60;
        this.commentList = [];
        this.drawNextFrame();
    }

    measureStringWidth(comment) {
        return Math.round(this.context.measureText(comment).width);
    }

    createComment(commentMessage) {
        // lineWidth はそのまま渡す
        const { comment, index } = this.calcCommentRow(this.measureStringWidth(commentMessage));
        if (!comment) return;
        const { commentMoveWidth, commentHeight } = this.getWindowSize();
        const commentMoveSpeed = comment.speed * 1000 / this.getFps();
        this.commentList.push(new CanvasComment(commentMessage, comment.width, commentMoveWidth, commentHeight, index, commentMoveSpeed, this.context.lineWidth));
    }

    // drawNextFrame() {
    //     // Canvas 画面のクリア
    //     // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //     // コメントを１フレーム進める処理
    //     this.commentList.forEach(comment => {
    //         // コメントのあった幅だけを削除
    //         if (comment.xEndPoint() < 0) this.commentList.shift();
    //         comment.render(this.context);
    //     });
    //     requestAnimationFrame(() => this.drawNextFrame());
    // }

    drawNextFrame() {
        // Canvas 画面のクリア
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // コメントを１フレーム進める処理
        for (let i = this.commentList.length-1; i>=0; i--) {
            this.commentList[i].render(this.context);
            if (this.commentList[i].xEndPoint() < 0) this.commentList.splice(i, 1);
        }
        requestAnimationFrame(() => this.drawNextFrame());
    }

    getFps() {
        return this.#fps;
    }
}

export { CanvasState };