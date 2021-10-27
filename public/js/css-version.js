const calcRow = commentMessage => {
    let comment = {
        bornTime: Date.now(),
        flowRow: 0,
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

        // 行にコメントが存在していない時
        if (timeLag >= commentDisplayTime) {
            createComment(commentMessage, comment, row, i);
            break;

            // コメントが行の右側まで出ていて、衝突しない時
        } else if (rowCommentRightSide >= 0 && collisionWidth <= 0) {
            createComment(commentMessage, comment, row, i);
            break;

        } else if (i == row.length - 1) {
            console.log("コメントを流せませんでした");
        }
    }
}

const createComment = (strMessage, comment, row, index) => {
    // 次、この行にコメントが流れる為の条件についての情報
    row[index].bornTime = comment.bornTime;
    row[index].speed = comment.speed;
    row[index].width = comment.width;

    comment.flowRow = index;
    const div_text = document.createElement("div");
    div_text.setAttribute("class", "chat")
    const placeholder = document.getElementById("placeholder");
    div_text.setAttribute("data-timelimit", `${comment.bornTime + commentDisplayTime}`)
    div_text.style.top = commentHeight * comment.flowRow + 'px';
    div_text.appendChild(document.createTextNode(strMessage));
    placeholder.appendChild(div_text);

}

// const commentDelete = () => {
//     let updateTime = Date.now()
//     // placeholder要素内の全ての子要素に対して以下の操作を行う
//     $(placeholder).children().each((index, i) => {
//         if(updateTime - $(i).attr("data-timelimit") >= 0) $(i).remove();
//     });
//     console.log("コメント削除関数を呼び出し完了")
// }

const commentDelete = () => {
    const updateTime = Date.now();
    const dom = document.getElementsByClassName("chat");
    for (const iterator of dom) {
        console.log(iterator.getAttribute("data-timelimit"));
        if (updateTime - iterator.getAttribute("data-timelimit") >= 0) {
            iterator.remove();
        }
    }
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