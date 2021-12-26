import measureStringWidth from "../modules/measure.js";
import { CreateCommentLaneHtml } from "./createCommentLaneHtml.js";

export class Css extends CreateCommentLaneHtml {

    constructor(commentLane, commentDisplayTime) {
        super(commentLane, commentDisplayTime);
        // CSS 変数にコメント行を代入
        document.documentElement.style.setProperty('--commentLane', this.getCommentLane());
    }


    calcCommentRow(commentMessage) {
        const commentDisplayTime = this.getCommentDisplayTime();
        const [commentMoveWidth, commentHeight] = this.getWindowSize();

        const comment = {
            bornTime: Date.now(),
            width: measureStringWidth(commentMessage),
        };
        comment.speed = (commentMoveWidth + comment.width) / commentDisplayTime;

        for (const [i, row] of this.rows.entries()) {
            const relativeSpeed = comment.speed - row.speed;
            const timeLag = comment.bornTime - row.bornTime;
            const rowCommentRightSide = row.speed * timeLag - row.width
            const collisionWidth = relativeSpeed * (commentDisplayTime - timeLag) - rowCommentRightSide;

            // 行にコメントが存在していないか コメントが行の右側まで出ていて、衝突しない時
            if (timeLag >= commentDisplayTime || rowCommentRightSide >= 0 && collisionWidth <= 0) {
                // 次、この行にコメントが流れる為の条件についての情報
                this.rows[i] = comment;
                return [commentMessage, comment, i];
            }
            if (i == this.rows.length - 1) {
                console.log("コメントを流せませんでした");
                return [null, null, null];

            }

        }
    }
}