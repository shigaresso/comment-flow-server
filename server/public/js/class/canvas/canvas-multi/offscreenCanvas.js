import {CanvasComment} from "../canvasComment.js";
// offscreenCanvas と context は初めて worker に送った時にだけ定義したいので、宣言と初期化を分けている。
let offscreenCanvas;
let context;

const commentList = [];
const fps = 60;

onmessage = event => {
    /*
     * メインスレッドから、OffscreenCanvas を受け取る
     * この行以降 offscreenCanvas 変数は通常の canvas と同様の処理が出来る
     */

    switch (event.data.pattern) {
        case "constructor":
            const { canvas, canvasSetting } = event.data;
            offscreenCanvas = canvas;
            // CanvasRenderingContext2D を取得する(引数を webgl にすれば webgl を利用出来る)
            context = offscreenCanvas.getContext("2d");
            // console.log(canvasSetting.textBaseline);
            context.textBaseline = canvasSetting.textBaseline;
            context.textAlign = canvasSetting.textAlign;
            context.lineWidth = canvasSetting.lineWidth;
            context.font = canvasSetting.font;
            context.fillStyle = canvasSetting.fillStyle;
            // 縁取り部分のテキストを尖らないようにする
            context.lineJoin = canvasSetting.lineJoin;
            break;
        case "receiveComment":
            const { comment, strMessage, commentWidth } = event.data;
            const { speed } = comment;
            createComment(strMessage, commentWidth, speed);
            break;
        default:
            console.log("worker default");
    }
}

function createComment(commentMessage, commentWidth, speed) {
    const moveWidth = offscreenCanvas.width;
    const moveSpeed = speed * 1000 / fps;
    commentList.push(new CanvasComment(commentMessage, commentWidth, moveWidth, offscreenCanvas.height, 0, moveSpeed, context.lineWidth));
}



function drawNextFrame() {
    // Canvas 画面のクリア
    if (context) {
        // コメントを１フレーム進める処理
        commentList.forEach(comment => {
            if (comment.xEndPoint() < 0) commentList.shift();
            comment.render(context);
        });
    }
    requestAnimationFrame(drawNextFrame);
}

requestAnimationFrame(drawNextFrame);