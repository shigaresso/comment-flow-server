const createComment = (strMessage, comment, rows, index) => {
    // 次、この行にコメントが流れる為の条件についての情報
    rows[index].bornTime = comment.bornTime;
    rows[index].speed = comment.speed;
    rows[index].width = comment.width;

    const div_text = document.createElement("div");
    div_text.className = "comment";
    const placeholder = document.getElementById(`row${index}`);
    div_text.setAttribute("data-timelimit", `${comment.bornTime + commentDisplayTime}`)
    // div_text.appendChild(document.createTextNode(strMessage));
    div_text.innerText = strMessage;
    placeholder.appendChild(div_text);

    // setTimeout(() => {
    //     div_text.remove();
    // },commentDisplayTime);
    div_text.addEventListener("animationend", () => div_text.remove());
}

export default createComment;