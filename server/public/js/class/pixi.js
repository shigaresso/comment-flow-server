import { DisplayProperty } from "./displayProperty.js";

class Comment {
    // コメントの Pixi.js インスタンス
    pixiInstance;
    // 1 回の更新で移動する量
    #move;

    constructor(pixiInstance, move) {
        this.pixiInstance = pixiInstance; // Text のインスタンス
        this.#move = move; // 1 フレームの移動量
    }

    // フレームの更新処理、画面外にコメントがいった場合、Comment クラスのインスタンスを配列から削除
    render() {
        this.pixiInstance.position.x -= this.#move;
    }
}

class Pixi_js extends DisplayProperty {
    #app;
    #style;
    #commentList;
    #fps;

    constructor(commentLane, commentDisplayTime, rowHeight) {
        super(commentLane, commentDisplayTime);
        this.#app = new PIXI.Application({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            transparent: true, // 背景を透明にする
        });
        document.body.appendChild(this.#app.view);

        this.#style = new PIXI.TextStyle({
            textBaseline: "bottom", // 高さの変更が出来る
            fontFamily: "Segoe UI Emoji, MS PGothic",
            fontSize: rowHeight,
            fontWeight: 900,
            fill: 0xFFFFFF, // テキストの色
            // strokeThickness: Math.round(rowHeight / 5), // テキストの縁取りの幅
            lineJoin: "round", // 縁取りの結合部
            stroke: 0x000000, // テキストの縁取りの色
        });

        this.#commentList = [];
        this.#fps = 60;
        this.drawNextFrame();
    }

    createComment(commentMessage) {
        const text = new PIXI.Text(commentMessage, this.#style)
        const { comment, index } = this.calcCommentRow(text.width);
        if (!comment) return;
        const { commentMoveWidth, commentHeight } = this.getWindowSize();
        text.position.x = commentMoveWidth; // scoreText の x 座標
        text.position.y = commentHeight * index; // scoreText の y 座標
        this.#app.stage.addChild(text);
        const speed = Math.floor(comment.speed * 1000 / this.getFps());
        console.log(speed);
        this.#commentList.push(new Comment(text, speed));
    }


    drawNextFrame() {
        for (let i = this.#commentList.length-1; i>=0; i--) {
            this.#commentList[i].render(this);
            if (this.#commentList[i].pixiInstance.position.x < -this.#commentList[i].pixiInstance.width) {
                this.#commentList.splice(i, 1);
            }
        }
        // 関数内は bind させるか無名関数で書かないとエラーになる
        requestAnimationFrame(() => this.drawNextFrame());
    }

    getFps() {
        return this.#fps;
    }
}

export { Comment, Pixi_js };