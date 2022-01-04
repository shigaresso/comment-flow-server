// offscreenCanvas と context は初めて worker に送った時にだけ定義したいので、宣言と初期化を分けている。
let offscreenCanvas;
let context;
onmessage = event => {
    /*
     * メインスレッドから、OffscreenCanvas を受け取る
     * この行以降 offscreenCanvas 変数は通常の canvas と同様の処理が出来る
     */

    switch (event.data.case) {
        case "constructor":
            offscreenCanvas = event.data.canvas;
            console.log(offscreenCanvas)
            // CanvasRenderingContext2D を取得する(引数を webgl にすれば webgl を利用出来る)
            context = offscreenCanvas.getContext("2d");

            context.textBaseline = "top";
            context.textAlign = "end"
            context.font = `900 ${event.data.rowHeight}px Segoe UI Emoji`;
            context.fillStyle = "white";
            // 縁取り部分のテキストを尖らないようにする
            context.lineJoin = "round";
            context.lineWidth = 13;
            break;
        case "receiveComment":
            console.log(event.data.comment);
            break;
        default:
            console.log("worker default");
    }
}

// setInterval(() => {
//     console.log("interval")
// }, 2000);