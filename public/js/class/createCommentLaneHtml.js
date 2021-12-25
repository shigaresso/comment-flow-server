import { DisplayProperty } from "./displayProperty.js";

export class CreateCommentLaneHtml extends DisplayProperty {
    constructor(commentLane, commentDisplayTime) {
        super(commentLane, commentDisplayTime);
        const container = document.getElementById('placeholder');
        console.log(container)
        for (let i = 0; i < this.getCommentLane(); i++) {
            const element = document.createElement('div');
            element.className = 'row';
            element.id = `row${i}`;
            container.appendChild(element);
        }
    }
}