const createCanvas = (domId, commentMoveWidth, rowHeight) => {
    const element = document.createElement("canvas");
    element.id = domId;
    element.className = "canvas";
    element.width = commentMoveWidth;
    element.height = rowHeight;
    document.body.appendChild(element);
}

const calcCommentRow = (rows, width) => {
    const commentDisplayTime = 5000;
    const commentMoveWidth = document.documentElement.clientWidth;

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

export { createCanvas, calcCommentRow };