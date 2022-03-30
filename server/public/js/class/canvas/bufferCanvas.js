export class BufferCanvas {
    // 表示する canvas のための x 座標
    #xPosition;
    // 表示する canvas のための y 座標 (行の index も持って良い)
    #yPosition;
    // コメントの高さ
    #commentHeight;
    // コメントの幅
    #commentWidth;
    // 配列から削除するかを判定するためのコメント幅
    #deleteJudgePoint;
    // 1 フレームの移動量
    #moveSpeed;
    // バッファ用の canvas (これを 表示用 canvas に drawImage や putImageData を用いて表示する)
    #bufferCanvas;

    constructor(textString, xPosition, commentHeight, index, commentWidth, moveSpeed, canvasSetting) {
        this.#xPosition = xPosition;
        this.#yPosition = commentHeight * index;
        this.#commentHeight = commentHeight;
        this.#commentWidth = commentWidth;
        this.#deleteJudgePoint = -1 * commentWidth;
        this.#moveSpeed = moveSpeed;
        this.#bufferCanvas = this.createBufferCanvas(textString, commentWidth, commentHeight, canvasSetting);
    }

    // メモリ上に保持するだけで、この canvas 自体は直接画面に表示する事はない
    createBufferCanvas(textString, commentWidth, commentHeight, canvasSetting) {
        // バッファ用の canvas の作成
        const offScreen = document.createElement("canvas");
        offScreen.width = commentWidth;
        offScreen.height = commentHeight;
        const context = offScreen.getContext("2d");

        const {textBaseline, textAlign, lineWidth, font, fillStyle, lineJoin} = canvasSetting;
        // ここで canvas の幅や高さを指定する必要があるかも (幅はコメント幅、高さはコメント行の高さを用いる)
        context.textBaseline = textBaseline;
        context.textAlign = textAlign;
        context.lineWidth = lineWidth;
        context.font = font;
        context.fillStyle = fillStyle;
        context.lineJoin = lineJoin;
        context.fillText(textString, 0, 0);
        return context.getImageData(0, 0, commentWidth, commentHeight);
    }

    // 表示用 canvas に渡す変数
    getBufferCanvas() {
        return { bufferCanvas: this.#bufferCanvas, xPosition: this.#xPosition, yPosition: this.#yPosition }
    }

    deletePreviewCanvas() {
        return { preXPosition: this.#xPosition + this.#moveSpeed, preYPosition: this.#yPosition, commentWidth: this.#commentWidth, commentHeight: this.#commentHeight }
    }

    moveComment() {
        this.#xPosition -= this.#moveSpeed;
    }

    judgeDelete() {
        return this.#deleteJudgePoint;
    }
}