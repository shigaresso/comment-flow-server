import calcCommentRow from "./modules/calcCommentRow.js";

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
    const [message, comment, index] = calcCommentRow(strMessage);
    if (!message) return;
    createComment(message, comment.width, index);
});


const createComment = async (strMessage, comment, index) => {
    const div_text = document.createElement("div");
    div_text.innerText = strMessage;
    count = count % 100000;
    count++;

    div_text.id = "text" + count;
    div_text.style.position = 'absolute';
    div_text.style.paddingLeft = "100%";
    div_text.style.lineHeight = "1em";
    const placeholder = document.getElementById(`row${index}`);
    placeholder.appendChild(div_text);

    // GSAP によるアニメーション
    await gsap.to("#" + div_text.id, {
        duration: 5,
        x: -1 * (document.documentElement.clientWidth + comment + 10),
        ease: "linear",
        force3D: true,
    });

    div_text.remove();
}