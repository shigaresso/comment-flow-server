const commentList = [];

onmessage = event => {
    switch (event.data.pattern) {
        case "constructor":
            const { canvas, canvasSetting } = event.data;
            // CanvasRenderingContext2D を取得する(引数を webgl にすれば webgl を利用出来る)
            const context = canvas.getContext("2d");
            // console.log(canvasSetting.textBaseline);
            context.textBaseline = canvasSetting.textBaseline;
            context.textAlign = canvasSetting.textAlign;
            context.lineWidth = canvasSetting.lineWidth;
            context.font = canvasSetting.font;
            context.fillStyle = canvasSetting.fillStyle;
            // 縁取り部分のテキストを尖らないようにする
            context.lineJoin = canvasSetting.lineJoin;
            requestAnimationFrame(() => drawNextFrame(context, canvas.height));
            break;

        case "receiveComment":
            const renderData = event.data.sendOffscreenCanvas;
            commentList.push(renderData);
            break;

        default:
            console.log("worker default");
    }
}

const drawNextFrame = (context, canvasHeight) => {
    // context.clearRect(0, 0, offscreenCanvas.width, canvasHeight);
    // 配列を逆順にループさせないと、ループ中に削除が入るので削除近辺でチラつく
    for (let i = commentList.length - 1; i >= 0; i--) {
        // ここの commentList[i] を そのまま 代入分割した xPoint を使ってしまうと次の描画の時に xPoint の変更がされないことに注意
        commentList[i].xPoint -= commentList[i].commentMoveSpeed;
        const {imageData, xPoint, commentWidth, deleteCommentPosition, commentMoveSpeed} = commentList[i];
        context.clearRect(xPoint+commentMoveSpeed+2, 0, commentWidth, canvasHeight);
        // y座標は 2 下げておかないと消せない部分が出る
        context.putImageData(imageData, xPoint, 2);
        if (xPoint < deleteCommentPosition - 10) commentList.splice(i, 1);
    }
    requestAnimationFrame(() => drawNextFrame(context, canvasHeight));
}