import createComment from "../js/modules/createComment.js";
import measureStringWidth from "../js/modules/measure.js";

const socket = io();

// 接続時の処理
socket.on('connect', () => {
    console.log("socket.ioに接続しました");
});

const myWorker = new Worker("../html/worker.js");
// サーバーからのメッセージ拡散に対する処理
socket.on('spread message', (strMessage) => {
    // OPENRECのコメントがスタンプの場合は処理しない
    if (strMessage.length == 0) return;
    
    const commentWidth = measureStringWidth(strMessage);
    
    if (window.Worker) {
        
        // 流れるコメントの作成

        // path の書き方を奇妙にしないと上手くいかない (path: worker.js) だと失敗する
        // Web-Worker へ送信する
        // console.log(worker);
        myWorker.postMessage({"text": strMessage, "commentWidth": commentWidth, "commentMoveWidth": commentMoveWidth, "commentDisplayTime": commentDisplayTime, "row": row});
        
        
        console.log('web-workerに送信済み');
    }
    // createComment(message, text, row, index);
});

myWorker.onmessage = e => {
    createComment(e.data.text, e.data.comment, e.data.row, e.data.index);
    // console.log(e);
}

