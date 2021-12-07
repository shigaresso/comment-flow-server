const commentDisplayTime = 5000;
setInterval(() => {
    const updateTime = Date.now();
    const dom = document.getElementsByClassName('chat');
    for (const iterator of dom) {
        console.log(iterator);
        if (updateTime - iterator.getAttribute("data-timelimit") >= 0) {
            iterator.remove();
        }
    }
}, 8000);

const calcRow = commentMessage => {
    let comment = {
        bornTime: Date.now(),
        flowRow: 0,
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

        // 行にコメントが存在していない時
        if (timeLag >= commentDisplayTime) {
            createComment(commentMessage, comment, rows, i);
            break;

            // コメントが行の右側まで出ていて、衝突しない時
        } else if (rowCommentRightSide >= 0 && collisionWidth <= 0) {
            createComment(commentMessage, comment, rows, i);
            break;

        } else if (i == rows.length - 1) {
            console.log("コメントを流せませんでした");
        }
    }
}

const createComment = (strMessage, comment, rows, index) => {
    // 次、この行にコメントが流れる為の条件についての情報
    rows[index].bornTime = comment.bornTime;
    rows[index].speed = comment.speed;
    rows[index].width = comment.width;

    comment.flowRow = index;
    const div_text = document.createElement("div");
    div_text.setAttribute("class", "chat")
    const placeholder = document.getElementById("placeholder");
    div_text.setAttribute("data-timelimit", `${comment.bornTime + commentDisplayTime}`)
    div_text.style.top = commentHeight * comment.flowRow + 'px';
    div_text.appendChild(document.createTextNode(strMessage));
    placeholder.appendChild(div_text);

}

/**
 * コメントが画面幅+コメント幅移動するので、コメント幅を調べる為の関数
 * @param {コメントにする文字列} string 
 * @returns 文字列の幅のピクセル
 */
const measureStringWidth = (string) => {
    const span = document.createElement("span");
    const text = document.createTextNode(string);
    span.appendChild(text);
    const ruler = document.getElementById("ruler");
    ruler.appendChild(span);
    const stringWidth = ruler.clientWidth;
    span.remove();
    return stringWidth;
}