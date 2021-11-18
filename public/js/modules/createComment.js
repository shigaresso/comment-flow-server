const createComment = (strMessage, comment, row, index) => {
    // 次、この行にコメントが流れる為の条件についての情報
    row[index].bornTime = comment.bornTime;
    row[index].speed = comment.speed;
    row[index].width = comment.width;

    const div_text = document.createElement("div");
    div_text.setAttribute("class", "chat");
    div_text.setAttribute("id", "move");
    const placeholder = document.getElementById("placeholder");
    div_text.setAttribute("data-timelimit", `${comment.bornTime + commentDisplayTime}`)
    div_text.style.top = commentHeight * index + 'px';
    div_text.appendChild(document.createTextNode(strMessage));
    placeholder.appendChild(div_text);

}

export default createComment;