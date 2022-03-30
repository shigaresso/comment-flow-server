const calcCommentRow = (rows, commentMoveWidth, commentWidth, commentDisplayTime) => {
    // コメントが流せるか判定するためのプロパティ
    const comment = {
        bornTime: Date.now(),
        width: commentWidth,
    };
    comment.speed = (commentMoveWidth + comment.width) / commentDisplayTime;

    for (const [index, row] of rows.entries()) {
        const relativeSpeed = comment.speed - row.speed;
        const timeLag = comment.bornTime - row.bornTime;
        const rowCommentRightSide = row.speed * timeLag - row.width
        const collisionWidth = relativeSpeed * (commentDisplayTime - timeLag) - rowCommentRightSide;
        // 行にコメントが存在していないか コメントが行の右側まで出ていて、衝突しない時
        if (timeLag >= commentDisplayTime || rowCommentRightSide >= 0 && collisionWidth <= 0) {
            // 次、この行にコメントが流れる為の条件についての情報
            rows[index] = comment;
            return {
                comment,
                index,
            };
        }
        if (index == rows.length - 1) {
            console.log("コメントを流せませんでした");
            return { comment: null };
        }
    }
}

export { calcCommentRow };