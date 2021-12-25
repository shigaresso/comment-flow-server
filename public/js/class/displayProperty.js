export class DisplayProperty {
    #commentLane;
    #commentDisplayTime;
    #commentMoveWidth;
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

    getWindowSize() {
        this.#setWindowSize();
        return [this.#commentMoveWidth, this.#commentHeight];
    }
    
    getCommentDisplayTime() {
        return this.#commentDisplayTime;
    }

    getCommentLane() {
        return this.#commentLane;
    }
}