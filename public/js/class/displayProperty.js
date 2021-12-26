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
        // コメント作成時に描画出来るか確認するための情報
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

    calcCommentRow(commentMessage, width) {
        const commentDisplayTime = this.getCommentDisplayTime();
        const [commentMoveWidth, commentHeight] = this.getWindowSize();

        const comment = {
            bornTime: Date.now(),
            width,
        };
        comment.speed = (commentMoveWidth + comment.width) / commentDisplayTime;

        for (const [index, row] of this.rows.entries()) {
            const relativeSpeed = comment.speed - row.speed;
            const timeLag = comment.bornTime - row.bornTime;
            const rowCommentRightSide = row.speed * timeLag - row.width
            const collisionWidth = relativeSpeed * (commentDisplayTime - timeLag) - rowCommentRightSide;
            // 行にコメントが存在していないか コメントが行の右側まで出ていて、衝突しない時
            if (timeLag >= commentDisplayTime || rowCommentRightSide >= 0 && collisionWidth <= 0) {
                // 次、この行にコメントが流れる為の条件についての情報
                this.rows[index] = comment;
                return {
                    commentMessage,
                    comment,
                    index,
                };
            }
            if (index == this.rows.length - 1) {
                console.log("コメントを流せませんでした");
                return { comment: null };
            }
        }
    }
}