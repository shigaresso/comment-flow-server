class CanvasComment {
    // コメントの文字列
    #text;
    // コメントの幅
    #commentWidth;
    // 1 行の幅
    #commentHeight;
    // コメントの x 座標
    #x0;
    // 矩形の削除範囲の始点の x 座標
    #x1;
    // 矩形の削除範囲の終点の x 座標
    #x2;
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
        this.#x0 = x;
        this.#x1 = x;
        this.#x2 = x;
        this.#y = commentHeight * index;
        this.#move = move;
        this.#lineWidth = lineWidth;
    }

    render(context) {
        if (this.#x0 >= document.documentElement.clientWidth) {
            this.#x2 = this.#x0 + this.#commentWidth + this.#lineWidth;
        }
        // まず前回の描画を削除する
        this.#x1 = this.#x0
        if (this.#x0 <= this.#move) this.#x1 = 0;
        if (this.#x2 >= 0) {
            context.clearRect(this.#x1, this.#y, this.#commentWidth + 2*this.#lineWidth, this.#commentHeight);
            // lineWidth / 2 上の部分にテキストの跡が残るからそのために下に下げている
            // context.strokeText(this.#text, this.#x0, this.#y);
            context.fillText(this.#text, this.#x0, this.#y);
        }
        this.#moveX();
    }

    #moveX() {
        this.#x0 -= this.#move;
        this.#x2 -= this.#move;
    }

    property() {
        return { x: this.#x2, move: this.#move }
    }
}

export { CanvasComment };