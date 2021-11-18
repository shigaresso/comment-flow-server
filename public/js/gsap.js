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
    const a = calcCommentRow(strMessage);
    if (!a) {
        return;
    }
    const [message, text, row, index] = a;
    createComment(message, text, row, index);
});

setInterval(commentDelete, commentDisplayTime);

const createComment = (strMessage, comment, row, index) => {
    // 次、この行にコメントが流れる為の条件についての情報
    row[index].bornTime = comment.bornTime;
    row[index].speed = comment.speed;
    row[index].width = comment.width;

    const div_text = document.createElement("div");
    div_text.setAttribute("class", "chat")
    const placeholder = document.getElementById("placeholder");
    count = count % 100000;
    div_text.id = "text" + count;
    div_text.setAttribute("data-timelimit", `${comment.bornTime + commentDisplayTime}`)
    count++;
    div_text.style.top = commentHeight * index + 'px';
    div_text.appendChild(document.createTextNode(strMessage));
    placeholder.appendChild(div_text);

    // GSAP によるアニメーション
    gsap.to("#" + div_text.id, {
        duration: 5,
        x: -1 * (document.documentElement.clientWidth + comment.width + 10),
        ease: "linear"
    });

}