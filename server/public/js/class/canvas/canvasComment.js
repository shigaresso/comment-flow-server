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
    // 1 行の高さ
    #commentHeight;
    // コメントの x 座標
    #xStartPoint;
    // 矩形の削除範囲終点の x 座標
    #xDeletePoint;
    // コメントの y 座標
    #yStartPoint;
    // コメントが 1 回の更新でどれだけ進むか
    #moveSpeed;
    // コメントの縁取りの幅
    #commentLineWidth;
    // テキストの端が削除する矩形からはみ出ないようにするため
    #padding = 5;
    
    constructor(commentString, commentWidth, commentMoveWidth, commentHeight, index, moveSpeed, commentLineWidth) {
        this.#commentString = commentString;
        this.#commentWidth = commentWidth;
        this.#commentHeight = commentHeight;
        this.#xStartPoint = commentMoveWidth;
        this.#xDeletePoint = commentMoveWidth + commentWidth + commentLineWidth;
        this.#yStartPoint = commentHeight * index;
        this.#moveSpeed = moveSpeed;
        this.#commentLineWidth = commentLineWidth;
    }

    render(context) {
        // まず前回の描画を削除する
        // this.#deletePreComment(context);
        this.#moveX();
        context.fillText(this.#commentString, this.#xStartPoint, this.#yStartPoint + 2);
    }

    #deletePreComment(context) {
        context.clearRect(this.#xStartPoint, this.#yStartPoint, this.#commentWidth + this.#commentLineWidth + this.#padding, this.#commentHeight);
    }

    #moveX() {
        this.#xStartPoint -= this.#moveSpeed;
        this.#xDeletePoint -= this.#moveSpeed;
    }

    xEndPoint() {
        return this.#xDeletePoint;
    }
}

export { CanvasComment };