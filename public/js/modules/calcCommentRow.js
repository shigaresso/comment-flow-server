import measureStringWidth from "./measure.js";

const calcCommentRow = commentMessage => {
    const comment = {
        bornTime: Date.now(),
        minCollisionWidth: commentMoveWidth,
        width: measureStringWidth(commentMessage),
        flag: false,
    };
    comment.speed = (commentMoveWidth + comment.width) / commentDisplayTime;

    for (let i = 0; i < rows.length; i++) {
        let relativeSpeed = comment.speed - rows[i].speed;
        let timeLag = comment.bornTime - rows[i].bornTime;
        let rowCommentRightSide = rows[i].speed * timeLag - rows[i].width
        let collisionWidth = relativeSpeed * (commentDisplayTime - timeLag) - rowCommentRightSide;

        // 行にコメントが存在していないか コメントが行の右側まで出ていて、衝突しない時
        if (timeLag >= commentDisplayTime || rowCommentRightSide >= 0 && collisionWidth <= 0) {
            return [commentMessage, comment, rows, i];
        }
        if (i == rows.length - 1) {
            console.log("コメントを流せませんでした");
            return [null, null, null, null];
        }
    }
}

export default calcCommentRow;