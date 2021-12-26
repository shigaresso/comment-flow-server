const createComment = (strMessage, bornTime, index) => {

    const div_text = document.createElement("div");
    div_text.className = "comment";
    const placeholder = document.getElementById(`row${index}`);
    div_text.innerText = strMessage;
    placeholder.appendChild(div_text);

    div_text.addEventListener("animationend", () => div_text.remove());
}

export default createComment;