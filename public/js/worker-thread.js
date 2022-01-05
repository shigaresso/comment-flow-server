const rows = Array(11)
    .fill()
    .map(_ => ({
        bornTime: 0,
        speed: 0,
        width: 0,
    }));

onmessage = e => {
    const { strMessage, width, commentMoveWidth, commentDisplayTime } = e.data;

    const comment = {
        bornTime: Date.now(),
        width,
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
            postMessage({
                strMessage,
                index,
            });
            return;
        }
    }
}