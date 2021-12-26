import { Css } from "./class/css.js";
import calcCommentRow from "./modules/calcCommentRow.js";
import createComment from "./modules/createComment.js";

const socket = io();
const instance = new Css(11, 5000);

// 接続時の処理
socket.on('connect', () => {
    console.log("socket.ioに接続しました");
});

// サーバーからのメッセージ拡散に対する処理
socket.on('spread message', (strMessage) => {
    // OPENRECのコメントがスタンプの場合は処理しない
    if (strMessage.length == 0) return;

    // 流れるコメントの作成
    const [message, comment, index] = instance.calcCommentRow(strMessage);
    if (!message) return;
    createComment(message, comment.bornTime, index);
});