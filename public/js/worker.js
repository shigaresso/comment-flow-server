const createComment = (strMessage, bornTime, index) => {

    const div_text = document.createElement("div");
    div_text.className = "comment";
    const placeholder = document.getElementById(`row${index}`);

    div_text.innerText = strMessage;
    placeholder.appendChild(div_text);
    div_text.addEventListener("animationend", () => div_text.remove());
}

const measureStringWidth = (string) => {
    const span = document.createElement("span");
    const text = document.createTextNode(string);
    span.appendChild(text);
    const ruler = document.getElementById("ruler");
    ruler.appendChild(span);
    const stringWidth = ruler.clientWidth;
    span.remove();
    return stringWidth;
}
const socket = io();

// 接続時の処理
socket.on('connect', () => {
    console.log("socket.ioに接続しました");
});

// なぜか Worker スレッドへのパスはこのファイルからではなく、HTML からの相対パスになる
const myWorker = new Worker("../js/worker-thread.js");
// サーバーからのメッセージ拡散に対する処理
socket.on('spread message', (strMessage) => {
    // OPENRECのコメントがスタンプの場合は処理しない
    if (strMessage.length == 0) return;

    const commentWidth = measureStringWidth(strMessage);

    if (window.Worker) {

        // Worker スレッドへ送信
        myWorker.postMessage({
            "text": strMessage,
            "commentWidth": commentWidth,
            "commentMoveWidth": commentMoveWidth,
            "commentDisplayTime": commentDisplayTime, "row": rows
        });
    }
});

myWorker.onmessage = e => {
    createComment(e.data.text, e.data.comment, e.data.index);

}

