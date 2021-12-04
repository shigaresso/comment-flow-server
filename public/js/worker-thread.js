const rows = Array(11);
for (let i = 0; i < 11; i++) {
    rows[i] = {
        bornTime: 0,
        speed: 0,
        width: 0,
    }
}

onmessage = e => {
    const comment = {
        bornTime: Date.now(),
        minCollisionWidth: e.data.commentMoveWidth,
        width: e.data.commentWidth,
        flag: false,
    };
    comment.speed = (e.data.commentMoveWidth + comment.width) / e.data.commentDisplayTime;

    // console.log(rows[1].bornTime);
    for (let i = 0; i < e.data.row.length; i++) {
        let relativeSpeed = comment.speed - rows[i].speed;
        let timeLag = comment.bornTime - rows[i].bornTime;
        let rowCommentRightSide = rows[i].speed * timeLag - rows[i].width
        let collisionWidth = relativeSpeed * (e.data.commentDisplayTime - timeLag) - rowCommentRightSide;

        // 行にコメントが存在していないか コメントが行の右側まで出ていて、衝突しない時
        if (timeLag >= e.data.commentDisplayTime || rowCommentRightSide >= 0 && collisionWidth <= 0) {
            rows[i].bornTime = comment.bornTime;
            rows[i].speed = comment.speed;
            rows[i].width = comment.width;
            postMessage({"text": e.data.text, "comment": comment, "row": e.data.row, "index":i});
            return
        }
        if (i == e.data.row.length - 1) {
            console.log("コメントを流せませんでした");
            return false;
        }
    }
}