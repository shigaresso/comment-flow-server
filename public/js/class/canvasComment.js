/**
 * コメントがあった部分を削除→描画を繰り返していく
 * まず clearRect で削除
 * コメントの描画部分は 最初、縁取りコメントの左側が画面の右端と接触していたいので 画面幅＋縁取り幅 からスタートさせる
 * 終了地点は コメント幅＋縁取り幅 とすれば、コメントが全て画面から出た状態となる
 * 削除、描画、次のコメントの描画位置への移動が必要になるが、描画→削除→次のコメント描画位置への移動としないといけない
 */


/**
 * 削除する矩形用の高さとコメント描画用の高さは分ける(横幅はコメント幅にパディングを付ければはみ出ることがない)
 * 
 */
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
    // テキストの端が削除する矩形からはみ出ないようにするため
    #padding;
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
        this.#padding = 5;
    }

    render(context) {
        if (this.#x0 >= document.documentElement.clientWidth) {
            this.#x2 = this.#x0 + this.#commentWidth + this.#lineWidth;
        }
        // まず前回の描画を削除する
        this.#x1 = this.#x0
        if (this.#x0 <= this.#move) this.#x1 = 0;
        if (this.#x2 >= 0) {
            context.clearRect(this.#x1, this.#y, this.#commentWidth + this.#padding+10, this.#commentHeight);
            // context.fillRect(this.#x0, this.#y, this.#commentWidth + this.#padding, this.#commentHeight);
            this.#moveX();
            // context.strokeText(this.#text, this.#x0, this.#y + this.#padding);
            context.fillText(this.#text, this.#x0, this.#y + 2);
        }
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