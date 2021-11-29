onmessage = e => {
    const comment = {
        bornTime: Date.now(),
        minCollisionWidth: e.data.commentMoveWidth,
        width: e.data.commentWidth,
        flag: false,
    };
    comment.speed = (e.data.commentMoveWidth + comment.width) / e.data.commentDisplayTime;

    for (let i = 0; i < e.data.row.length; i++) {
        let relativeSpeed = comment.speed - e.data.row[i].speed;
        let timeLag = comment.bornTime - e.data.row[i].bornTime;
        let rowCommentRightSide = e.data.row[i].speed * timeLag - e.data.row[i].width
        let collisionWidth = relativeSpeed * (e.data.commentDisplayTime - timeLag) - rowCommentRightSide;

        // 行にコメントが存在していないか コメントが行の右側まで出ていて、衝突しない時
        if (timeLag >= e.data.commentDisplayTime || rowCommentRightSide >= 0 && collisionWidth <= 0) {
            postMessage({"text": e.data.text, "comment": comment, "row": e.data.row, "index":i});
            return
        }
        if (i == e.data.row.length - 1) {
            console.log("コメントを流せませんでした");
            return false;
        }
    }
}