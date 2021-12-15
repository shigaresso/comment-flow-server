import measureStringWidth from "./measure.js";

const calcCommentRow = commentMessage => {
    const comment = {
        bornTime: Date.now(),
        width: measureStringWidth(commentMessage),
    };
    comment.speed = (commentMoveWidth + comment.width) / commentDisplayTime;

    for (const [i, row] of rows.entries()) {
        const relativeSpeed = comment.speed - row.speed;
        const timeLag = comment.bornTime - row.bornTime;
        const rowCommentRightSide = row.speed * timeLag - row.width
        const collisionWidth = relativeSpeed * (commentDisplayTime - timeLag) - rowCommentRightSide;

        // 行にコメントが存在していないか コメントが行の右側まで出ていて、衝突しない時
        if (timeLag >= commentDisplayTime || rowCommentRightSide >= 0 && collisionWidth <= 0) {
            // 次、この行にコメントが流れる為の条件についての情報
            rows[i] = comment;
            return [commentMessage, comment, i];
        }
        if (i == rows.length - 1) {
            console.log("コメントを流せませんでした");
            return [null, null, null];

        }

    }
}

export default calcCommentRow;