import { DisplayProperty } from "./displayProperty.js";

class Comment {
    constructor(text, x, y, move) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.move = move;
    }

    update() {
        this.x -= this.move;
    }

    render(context) {
        context.strokeText(this.text, this.x, this.y);
        context.fillText(this.text, this.x, this.y);
    }
}

class CanvasState extends DisplayProperty {
    constructor(commentLane, commentDisplayTime) {
        super(commentLane, commentDisplayTime);
    }

    #measureStringWidth(comment) {
        return Math.round(context.measureText(comment).width);
    }

    createComment(commentMessage) {
        // コメントを流す場合に流す行を更新するのに必要なプロパティ
        const commentDisplayTime = this.getCommentDisplayTime();
        const [commentMoveWidth, commentHeight] = this.getWindowSize();

        const comment = {
            bornTime: Date.now(),
            width: this.#measureStringWidth(commentMessage),
        }
        comment.speed = (commentMoveWidth + comment.width) / commentDisplayTime;


        const moveWidth = commentMoveWidth + comment.width;
        for (let i = 0; i < this.getCommentLane(); i++) {
            let timeLag = comment.bornTime - this.rows[i].bornTime;
            let relativeSpeed = comment.speed - this.rows[i].speed;
            let rowCommentRightSide = this.rows[i].speed * timeLag - this.rows[i].width;
            let collisionWidth = relativeSpeed * (commentDisplayTime - timeLag) - rowCommentRightSide;

            if (timeLag >= commentDisplayTime || rowCommentRightSide >= 0 && collisionWidth <= 0) {
                // コメント作成作業
                const move = comment.speed * 1000 / fps;
                console.log(moveWidth, move)
                this.rows[i] = comment;
                console.log(new Comment(commentMessage, moveWidth, commentHeight * i, move))
                commentList.push(new Comment(commentMessage, moveWidth, commentHeight * i, move));
                return;
            }
        }
    }

    drawNextFrame(commentList) {
        // console.log(commentList)

        // Canvas 画面のクリア
        context.clearRect(0, 0, canvas.width, canvas.height);
        // コメントを１フレーム進める処理
        commentList.forEach(comment => {
            comment.update();
            if (comment.x <= 0) commentList.shift();
            comment.render(context);
        });
    }
}

export { Comment, CanvasState };