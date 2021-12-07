const calcWindowSize = () => {
    return [
        Math.round(document.documentElement.clientHeight / windowDevided),
        document.documentElement.clientWidth,
    ]
}

// ブラウザに何行のコメントを表示するか
const windowDevided = 11;
document.documentElement.style.setProperty('--windowDevided', windowDevided);

const container = document.getElementById('placeholder');
for (let i = 0; i < windowDevided; i++) {
    const element = document.createElement('div');
    element.className = 'row';
    element.id = `row${i}`;
    container.appendChild(element);
}

// コメント1行の高さ,幅を取得(スクロールバーを除いたもの)
let [commentHeight, commentMoveWidth] = calcWindowSize();
// コメントの表示時間(単位：ms)
const commentDisplayTime = 5000;

// 流れたコメントの数(GSAPによるコメントの移動に用いる)
let count = 0;

// 各行の情報を持つ配列の作成
const rows = Array(windowDevided);
for (let i = 0; i < windowDevided; i++) {
    rows[i] = {
        bornTime: 0,
        speed: 0,
        width: 0,
    }
}

window.onresize = () => {
    [commentHeight, commentMoveWidth] = calcWindowSize();
}