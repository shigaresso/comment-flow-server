export class DisplayProperty {
    // コメントを何行流すかの設定
    #commentLane;
    // コメントが何秒で流れきるかの設定
    #commentDisplayTime;
    // コメントのディスプレイ上での移動幅
    #commentMoveWidth;
    // コメントテキストの高さ
    #commentHeight;

    constructor(commentLane, commentDisplayTime) {
        this.#commentLane = commentLane;
        this.rows = Array(this.#commentLane)
            .fill()
            .map(_ => ({
                bornTime: 0,
                speed: 0,
                width: 0,
            }));
        this.#commentDisplayTime = commentDisplayTime;
        this.#setWindowSize();
    }

    #setWindowSize() {
        this.#commentMoveWidth = document.documentElement.clientWidth;
        this.#commentHeight = Math.round(document.documentElement.clientHeight / this.#commentLane);
    }

    /**
     * 
     * @returns HTML ファイルの幅とコメントテキスト 1 行の高さ
     */
    getWindowSize() {
        this.#setWindowSize();
        return [this.#commentMoveWidth, this.#commentHeight];
    }

    /**
     * 
     * @returns コメントが何秒で流れきるか
     */
    getCommentDisplayTime() {
        return this.#commentDisplayTime;
    }

    /**
     * 
     * @returns コメントが何行流れるか
     */
    getCommentLane() {
        return this.#commentLane;
    }
}