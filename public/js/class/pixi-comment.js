class Comment {
    #pixiInstance
    #move

    constructor(pixiInstance, move) {
        this.#pixiInstance = pixiInstance; // Text のインスタンス
        this.#move = move; // 1 フレームの移動量
    }

    // フレームの更新処理、画面外にコメントがいった場合、Comment クラスのインスタンスを配列から削除
    render(array) {
        this.#pixiInstance.position.x -= this.#move;
        if (this.#pixiInstance.position.x < -this.#pixiInstance.width - 1000) {
            array.shift();
            return;
        }
    }
}

export { Comment };