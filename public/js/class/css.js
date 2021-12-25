import { CreateCommentLaneHtml } from "./createCommentLaneHtml.js";

export class Css extends CreateCommentLaneHtml {
    constructor(commentLane, commentDisplayTime) {
        super(commentLane, commentDisplayTime);
        // CSS 変数にコメント行を代入
        document.documentElement.style.setProperty('--commentLane', this.getCommentLane());
    }
}