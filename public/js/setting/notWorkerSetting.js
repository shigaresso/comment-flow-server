/**
 * わざわざ設定ファイルを分ける理由は、worker thread で
 * 利用していない rowHeight も読み込まれ、worker 側では
 * document.documentElement.clientHeight が利用出来ずにエラーになるから
 *  */ 
import { rowCount } from "./setting.js";

export const rowHeight = Math.round(document.documentElement.clientHeight / rowCount);
export const commentMoveWidth = document.documentElement.clientWidth;
// canvas 用の設定
export const canvasSetting = {
    textBaseline: "top",
    textAlign: "start",
    lineWidth: "13",
    fillStyle: "white",
    lineJoin: "round", // 縁取り部分のテキストを尖らないようにする
}
canvasSetting.font = `900 ${rowHeight - 2 * canvasSetting.lineWidth}px Segoe UI Emoji`;