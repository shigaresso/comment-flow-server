export const rowCount = 5;
export const rowHeight = Math.round(document.documentElement.clientHeight / rowCount);
export const commentDisplayTime = 5000;
export const commentMoveWidth = document.documentElement.clientWidth;

// canvas 用の設定
export const canvasSetting = {
    textBaseline: "top",
    textAlign: "start",
    lineWidth: "13",
    font: `900 ${rowHeight}px Segoe UI Emoji`,
    fillStyle: "white",
    lineJoin: "round", // 縁取り部分のテキストを尖らないようにする
}