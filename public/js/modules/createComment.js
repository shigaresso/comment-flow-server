const createComment = (strMessage, comment, row, index) => {
    // 次、この行にコメントが流れる為の条件についての情報
    row[index].bornTime = comment.bornTime;
    row[index].speed = comment.speed;
    row[index].width = comment.width;

    const div_text = document.createElement("div");
    div_text.className = "comment";
    const placeholder = document.getElementById(`row${index}`);
    div_text.setAttribute("data-timelimit", `${comment.bornTime + commentDisplayTime}`)
    // div_text.appendChild(document.createTextNode(strMessage));
    div_text.innerText = strMessage;
    placeholder.appendChild(div_text);

    setTimeout(() => {
        div_text.remove();
    },commentDisplayTime);
}

export default createComment;