import { CreateCommentLaneHtml } from "./createCommentLaneHtml.js";

class Css extends CreateCommentLaneHtml {

    constructor(commentLane, commentDisplayTime) {
        super(commentLane, commentDisplayTime);
        // CSS 変数にコメント行を代入
        document.documentElement.style.setProperty('--commentLane', this.getCommentLane());
    }

    createComment(strMessage) {
        const { comment, index } = this.calcCommentRow(this.measureStringWidth(strMessage));
        if (!comment) return;
        const div_text = document.createElement("div");
        div_text.className = "comment";
        const placeholder = document.getElementById(`row${index}`);
        div_text.innerText = strMessage;
        placeholder.appendChild(div_text);

        div_text.addEventListener("animationend", () => div_text.remove());
    }
}

export { Css };