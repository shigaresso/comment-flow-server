import { DisplayProperty } from "./displayProperty.js";

export class CreateCommentLaneHtml extends DisplayProperty {

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
}