import calcCommentRow from "./modules/calcCommentRow.js";
import commentDelete from "./modules/commentDelete.js";
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socket = io();

// 接続時の処理
socket.on('connect', () => {
    console.log("socket.ioに接続しました");
});

// サーバーからのメッセージ拡散に対する処理
socket.on('spread message', (strMessage) => {
    // OPENRECのコメントがスタンプの場合は処理しない
    if (strMessage.length == 0) return;

    // 流れるコメントの作成
    calcCommentRow(strMessage);
});

setInterval(commentDelete, commentDisplayTime);