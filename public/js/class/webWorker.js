import { Css } from "./css.js";

class WebWorker extends Css {
    constructor(commentLane, commentDisplayTime) {
        super(commentLane, commentDisplayTime);
        // Worker スレッドへのパスはこのファイルからではなく、HTML からの相対パスになる(そういった仕様)
        this.myWorker = new Worker("../js/worker-thread.js", {type: "module"});
        this.myWorker.onmessage = e => {
            const {strMessage, index} = e.data;
            const div_text = document.createElement("div");
            div_text.className = "comment";
            const placeholder = document.getElementById(`row${index}`);
            div_text.innerText = strMessage;
            placeholder.appendChild(div_text);

            div_text.addEventListener("animationend", () => div_text.remove());
        }
    }

    createComment(strMessage) {
        this.myWorker.postMessage({
            strMessage,
            width: this.measureStringWidth(strMessage),
            commentMoveWidth: this.measureStringWidth(strMessage),
            commentDisplayTime: this.getCommentDisplayTime(),
        });
    }
}

export { WebWorker };