function measureStringWidth(string) {
    const span = document.createElement("span");
    const text = document.createTextNode(string);
    span.appendChild(text);
    const ruler = document.getElementById("ruler");
    ruler.appendChild(span);
    const stringWidth = ruler.clientWidth;
    span.remove();
    return stringWidth;
}

export function calcCommentRow(str, rows) {
    const width = measureStringWidth(str)
    const commentDisplayTime = 5000;
    const commentMoveWidth = document.body.clientWidth;

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