// ブラウザに何行のコメントを表示するか
const windowDevided = 11;
// コメント1行の高さを取得
let commentHeight = Math.round(document.documentElement.clientHeight / windowDevided);
let commentMoveWidth = document.documentElement.clientWidth;
// コメントの表示時間(単位：ms)
const commentDisplayTime = 5000;

// 流れたコメントの数(GSAPによるコメントの移動にも用いる)
let count = 0;

// 各行の情報を持つ配列の作成
let row = Array(windowDevided);
for (let i = 0; i < windowDevided; i++) {
    row[i] = {
        bornTime: 0,
        speed: 0,
        width: 0,
    }
}

window.onresize = () => {
    commentHeight = Math.round(document.documentElement.clientHeight / windowDevided);
    commentMoveWidth = document.documentElement.clientWidth;
}