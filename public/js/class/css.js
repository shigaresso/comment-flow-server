import { CreateCommentLaneHtml } from "./createCommentLaneHtml.js";

export class Css extends CreateCommentLaneHtml {

    constructor(commentLane, commentDisplayTime) {
        super(commentLane, commentDisplayTime);
        // CSS 変数にコメント行を代入
        document.documentElement.style.setProperty('--commentLane', this.getCommentLane());
    }

    createComment(strMessage) {
        const commentProperty = this.calcCommentRow(strMessage, this.measureStringWidth(strMessage));
        if (!commentProperty.comment) return;
        const div_text = document.createElement("div");
        div_text.className = "comment";
        const placeholder = document.getElementById(`row${commentProperty.index}`);
        div_text.innerText = strMessage;
        placeholder.appendChild(div_text);
    
        div_text.addEventListener("animationend", () => div_text.remove());
    }
}