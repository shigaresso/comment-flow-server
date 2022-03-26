import { rowCount, commentDisplayTime } from "./setting.js";
import { rowHeight, canvasSetting } from "./notWorkerSetting.js";
import { createCanvas, CanvasState } from "../class/canvas/canvas.js";
import { BufferCanvasState } from "../class/canvas/bufferCanvasState.js";
import { Css } from "../class/css.js";
import { Gsap } from "../class/gsap.js";
import { Pixi_js } from "../class/pixi.js";
import { WebWorker } from "../class/webWorker.js";

// 各方法のコメント取得クラスのインスタンスを保持する
let getComment;

// localhost:port 以降が何かで利用するファイルを分岐させる
switch (location.pathname) {
    case "/buffer-canvas/":
        createCanvas("placeholder", document.documentElement.clientWidth, document.documentElement.clientHeight);
        getComment = new BufferCanvasState(rowCount, commentDisplayTime, canvasSetting);    
        break;

    case "/canvas/":
        createCanvas("placeholder", document.documentElement.clientWidth, document.documentElement.clientHeight);
        getComment = new CanvasState(rowCount, commentDisplayTime, canvasSetting);
        break;

    case "/css/":
        getComment = new Css(rowCount, commentDisplayTime);
        break;

    case "/gsap/":
        getComment = new Gsap(rowCount, commentDisplayTime);
        break;

    case "/pixi-js/":
        getComment = new Pixi_js(rowCount, commentDisplayTime, rowHeight);
        break;

    case "/web-worker/":
        getComment = new WebWorker(rowCount, commentDisplayTime);
        break;
}