import { Css } from "./css.js";

class WebWorker extends Css {
    constructor(commentLane, commentDisplayTime) {
        super(commentLane, commentDisplayTime);
        // Worker スレッドへのパスはこのファイルからではなく、HTML からの相対パスになる(そういった仕様)
        this.myWorker = new Worker("../js/worker-thread.js", {type: "module"});
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