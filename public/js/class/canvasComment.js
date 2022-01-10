class CanvasComment {
    // コメントの文字列
    #text;
    // コメントの幅
    #commentWidth;
    // 1 行の幅
    #commentHeight;
    // コメントの x 座標
    #x;
    // コメントの y 座標
    #y;
    // コメントが 1 回の更新でどれだけ進むか
    #move;
    // コメントの縁取りの幅
    #lineWidth;
    constructor(text, commentWidth, x, commentHeight, index, move, lineWidth) {
        this.#text = text;
        this.#commentWidth = commentWidth;
        this.#commentHeight = commentHeight;
        this.#x = x;
        this.#y = commentHeight * index;
        this.#move = move;
        this.#lineWidth = lineWidth;
    }

    render(context) {
        // まず前回の描画を削除する
        let x0 = this.#x
        if (x0 <= this.#commentWidth) x0 = 0;
        context.clearRect(x0, this.#y, this.#x + this.#commentWidth + this.#lineWidth, this.#y + this.#commentHeight);
        context.strokeText(this.#text, this.#x, this.#y);
        context.fillText(this.#text, this.#x, this.#y);
        this.#x -= this.#move;
    }

    property() {
        return { x: this.#x + this.#commentWidth + this.#lineWidth, move: this.#move }
    }
}

export { CanvasComment };