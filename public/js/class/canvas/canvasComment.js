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
    #commentString;
    // コメントの幅
    #commentWidth;
    // 1 行の幅
    #commentHeight;
    // コメントの移動距離
    #commentMoveWidth;
    // コメントの x 座標
    #xStartPoint;
    // 矩形の削除範囲の始点の x 座標
    #xDeleteStartPoint;
    // 矩形の削除範囲の終点の x 座標
    #xDeleteEndPoint;
    // コメントの y 座標
    #yStartPoint;
    // コメントが 1 回の更新でどれだけ進むか
    #moveSpeed;
    // コメントの縁取りの幅
    #commentLineWidth;
    // テキストの端が削除する矩形からはみ出ないようにするため
    #padding = 15;
    constructor(commentString, commentWidth, commentMoveWidth, commentHeight, index, moveSpeed, commentLineWidth) {
        this.#commentString = commentString;
        this.#commentWidth = commentWidth;
        this.#commentHeight = commentHeight;
        this.#commentMoveWidth = commentMoveWidth;
        this.#xStartPoint = commentMoveWidth;
        this.#xDeleteStartPoint = commentMoveWidth;
        this.#xDeleteEndPoint = commentMoveWidth;
        this.#yStartPoint = commentHeight * index;
        this.#moveSpeed = moveSpeed;
        this.#commentLineWidth = commentLineWidth;
    }

    render(context) {
        if (this.#xStartPoint >= this.#commentMoveWidth) {
            this.#xDeleteEndPoint = this.#xStartPoint + this.#commentWidth + this.#commentLineWidth;
        }
        // まず前回の描画を削除する
        this.#deletePreComment(context);
            this.#moveX();
            context.fillText(this.#commentString, this.#xStartPoint, this.#yStartPoint + 2);
    }

    #deletePreComment(context) {
        this.#xDeleteStartPoint = this.#xStartPoint
        if (this.#xStartPoint <= this.#moveSpeed) this.#xDeleteStartPoint = 0;
        context.clearRect(this.#xDeleteStartPoint, this.#yStartPoint, this.#commentWidth + this.#padding, this.#commentHeight);
    }

    #moveX() {
        this.#xStartPoint -= this.#moveSpeed;
        this.#xDeleteEndPoint -= this.#moveSpeed;
    }

    xEndPoint() {
        return this.#xDeleteEndPoint;
    }
}

export { CanvasComment };