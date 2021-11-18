import measureStringWidth from "./measure.js";

const calcCommentRow = commentMessage => {
    const comment = {
        bornTime: Date.now(),
        minCollisionWidth: commentMoveWidth,
        width: measureStringWidth(commentMessage),
        flag: false,
    };
    comment.speed = (commentMoveWidth + comment.width) / commentDisplayTime;

    for (let i = 0; i < row.length; i++) {
        let relativeSpeed = comment.speed - row[i].speed;
        let timeLag = comment.bornTime - row[i].bornTime;
        let rowCommentRightSide = row[i].speed * timeLag - row[i].width
        let collisionWidth = relativeSpeed * (commentDisplayTime - timeLag) - rowCommentRightSide;

        // 行にコメントが存在していないか コメントが行の右側まで出ていて、衝突しない時
        if (timeLag >= commentDisplayTime || rowCommentRightSide >= 0 && collisionWidth <= 0) {
            return [commentMessage, comment, row, i];
        }
        if (i == row.length - 1) {
            console.log("コメントを流せませんでした");
            return false;
        }
    }
}

export default calcCommentRow;