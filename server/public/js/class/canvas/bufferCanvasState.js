import { BufferCanvas } from "./bufferCanvas.js";
import { CanvasState } from "./canvas.js";

export class BufferCanvasState extends CanvasState {
    #canvasSetting
    constructor(commentLane, commentDisplayTime, canvasSetting) {
        super(commentLane, commentDisplayTime, canvasSetting);
        this.#canvasSetting = canvasSetting;
    }

    createComment(commentMessage) {
        // lineWidth はそのまま渡す
        const { comment, index } = this.calcCommentRow(this.measureStringWidth(commentMessage));
        if (!comment) return;
        const { commentMoveWidth, commentHeight } = this.getWindowSize();
        const commentMoveSpeed = comment.speed * 1000 / this.getFps();
        this.commentList.push(new BufferCanvas(commentMessage, commentMoveWidth, commentHeight, index, comment.width, commentMoveSpeed, this.#canvasSetting));
    }

    drawNextFrame() {
        // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // 配列を逆順にループさせないと、ループ中に削除が入るので削除近辺でチラつく
        for (let i = this.commentList.length-1; i>=0; i--) {
            const {preXPosition, preYPosition, commentWidth, commentHeight} = this.commentList[i].deletePreviewCanvas();
            this.context.clearRect(preXPosition, preYPosition, commentWidth, commentHeight);
            this.commentList[i].moveComment();
            const {bufferCanvas, xPosition, yPosition} = this.commentList[i].getBufferCanvas();
            this.context.putImageData(bufferCanvas, xPosition, yPosition);
            if (xPosition < this.commentList[i].judgeDelete()) this.commentList.splice(i, 1);
        }
        requestAnimationFrame(() => this.drawNextFrame());
    }
}