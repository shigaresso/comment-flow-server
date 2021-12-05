import calcCommentRow from "./modules/calcCommentRow.js";
import commentDelete from "./modules/commentDelete.js";

const socket = io();

// 接続時の処理
socket.on('connect', () => {
    console.log("socket.ioに接続しました");
});

const createComment = async (strMessage, comment, row, index) => {
    // 次、この行にコメントが流れる為の条件についての情報
    row[index].bornTime = comment.bornTime;
    row[index].speed = comment.speed;
    row[index].width = comment.width;

    const div_text = document.createElement("div");
    const placeholder = document.getElementById(`row${index}`);
    count = count % 100000;
    div_text.id = "text" + count;
    div_text.setAttribute("data-timelimit", `${comment.bornTime + commentDisplayTime}`)
    count++;
    div_text.appendChild(document.createTextNode(strMessage));
    placeholder.appendChild(div_text);

    // GSAP によるアニメーション
    await gsap.to("#" + div_text.id, {
        duration: 5,
        x: -1 * (document.documentElement.clientWidth + comment.width + 10),
        ease: "linear"
    });
    div_text.parentNode.removeChild(div_text);
}

// サーバーからのメッセージ拡散に対する処理
socket.on('spread message', (strMessage) => {
    // OPENRECのコメントがスタンプの場合は処理しない
    if (strMessage.length == 0) return;

    // 流れるコメントの作成
    const [message, text, row, index] = calcCommentRow(strMessage);
    if (!message) return;
    createComment(message, text, row, index);
});

setInterval(commentDelete, commentDisplayTime);

