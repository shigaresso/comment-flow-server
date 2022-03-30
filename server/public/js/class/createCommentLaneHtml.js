import { DisplayProperty } from "./displayProperty.js";

class CreateCommentLaneHtml extends DisplayProperty {

    constructor(commentLane, commentDisplayTime) {
        super(commentLane, commentDisplayTime);

        // コメントが流れる行を HTML に作成する
        const container = document.getElementById('placeholder');
        for (let i = 0; i < this.getCommentLane(); i++) {
            const element = document.createElement('div');
            element.className = 'row';
            element.id = `row${i}`;
            container.appendChild(element);
        }
    }

    /**
    * コメントが画面幅+コメント幅移動するので、コメント幅を調べる為の関数
    * @param {コメントにする文字列} string 
    * @returns 描画される文字列のピクセル幅
    */
    measureStringWidth(string) {
        const span = document.createElement("span");
        const text = document.createTextNode(string);
        span.appendChild(text);
        const ruler = document.getElementById("ruler");
        ruler.appendChild(span);
        const stringWidth = ruler.clientWidth;
        span.remove();
        return stringWidth;
    }
}

export { CreateCommentLaneHtml };