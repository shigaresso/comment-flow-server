import { CreateCommentLaneHtml } from "./createCommentLaneHtml.js";

class Gsap extends CreateCommentLaneHtml {
    // コメントの流れた数(GSAP でコメントを移動させる場合、IDが必要になるため、そのIDとして利用する)
    #gsapCount;

    constructor(commentLane, commentDisplayTime) {
        super(commentLane, commentDisplayTime);
        this.#gsapCount = 0;
    }

    #getGsapCount() {
        this.#gsapCount %= 100000;
        this.#gsapCount++;
        return this.#gsapCount;
    }

    async createComment(strMessage) {
        const { comment, index } = this.calcCommentRow(strMessage, this.measureStringWidth(strMessage));
        if (!comment) return;

        const div_text = document.createElement("div");
        div_text.innerText = strMessage;

        div_text.id = "text" + this.#getGsapCount();
        div_text.style.position = 'absolute';
        div_text.style.paddingLeft = "100%";
        div_text.style.lineHeight = "1em";
        const placeholder = document.getElementById(`row${index}`);
        placeholder.appendChild(div_text);
        console.log(comment.width)
        // GSAP によるアニメーション
        await gsap.to("#" + div_text.id, {
            duration: 5,
            x: -1 * (document.documentElement.clientWidth + comment.width + 10),
            ease: "linear",
            force3D: true,
        });

        div_text.remove();
    }
}

export { Gsap };