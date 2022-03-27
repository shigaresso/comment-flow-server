"use strict";
// Node.jsのバージョンv14.16.1で動作確認
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");


// インスタンス化
const app = express();
const server = http.Server(app);
const io = socketIO(server, {
    cors: {
        origin: /https?:\/\/(localhost:3000|www.(openrec.tv|twitch.tv|youtube.com))/,
        methods: ["GET", "POST"],
    }
})

// サーバーのポート番号
const port = 10010;


// corsの許可、POSTでjsonを受け取るのに必要
app.use(
    cors(),
    express.urlencoded({ extended: true }),
    express.json(),
    express.static("public")
);

// これで /socket.io-client/〇〇 と記述すれば /node_modules/socket.io-clinet/dist 内のファイルをインポートできる
app.use("/socket.io-client", express.static(__dirname + "/node_modules/socket.io-client/dist/"));

// socket.io接続時、及びその後の処理
io.on("connection", (socket) => {
    console.log("socket.ioに接続しました");

    // 拡張機能のXMLHttpRequestからPOSTメソッドされた時のルーティングの設定
    app.post("/", (req, res) => {
        // 受け取ったJSONのcommentを表示する
        console.log(req.body.comment);
        res.send(req.body);

        // spread message 部分に受け取ったデータを送信する
        io.emit("spread message", req.body.comment);
    });

    // localhostからの新しいメッセージ受信時の処理 strMessageのstrは文字列の略？
    socket.on("chat message", (strMessage) => {
        console.log(`chat message:${strMessage}`);

        // クライアントに受信したメッセージを送信
        io.emit("spread message", strMessage);
    })

    // 切断時の処理
    socket.on("disconnect", () => {
        console.log("ブラウザが切断されました");
    });
});

// GETメソッドされた時のルーティングの設定
app.get("/gsap", (req, res) => {
    console.log("gsap へのアクセスがありました")
    /*
        "/" にアクセスがあった時、res.sendFile()によって、
        __dirname(このプログラムのディレクトリのパス)/comment-flow-gsap.htmlを渡す
    */
    res.sendFile(`${__dirname}/public/html/gsap.html`);
});

app.get("/buffer-canvas", (req, res) => {
    console.log("buffer-canvas へのアクセスがありました")
    res.sendFile(`${__dirname}/public/html/buffer-canvas.html`);
});

app.get("/buffer-multi", (req, res) => {
    console.log("buffer-multi へのアクセスがありました")
    res.sendFile(`${__dirname}/public/html/buffer-multi.html`);
});

app.get("/canvas", (req, res) => {
    console.log("canvas へのアクセスがありました")
    res.sendFile(`${__dirname}/public/html/canvas.html`);
});

app.get("/canvas-multi", (req, res) => {
    console.log("canvas-multi へのアクセスがありました")
    res.sendFile(`${__dirname}/public/html/canvas-multi.html`);
});


app.get("/css", (req, res) => {
    console.log("CSS へのアクセスがありました")
    res.sendFile(`${__dirname}/public/html/css.html`);
});

app.get("/pixi-js", (req, res) => {
    console.log("Pixi.js へのアクセスがありました")
    res.sendFile(`${__dirname}/public/html/pixi-js.html`);
});

app.get("/test", (req, res) => {
    console.log("test へのアクセスがありました")
    res.sendFile(`${__dirname}/public/html/test.html`);
});

app.get("/three-js", (req, res) => {
    console.log("three.js へのアクセスがありました")
    res.sendFile(`${__dirname}/public/html/three-js.html`);
});

app.get("/web-worker", (req, res) => {
    console.log("webworker へのアクセスがありました")
    res.sendFile(`${__dirname}/public/html/web-worker.html`);
});

// サーバーの起動
server.listen(port, () => {
    console.log(`listening on http://localhost:${port}/buffer-canvas/`);
    console.log(`listening on http://localhost:${port}/buffer-multi/`);
    console.log(`listening on http://localhost:${port}/canvas/`);
    console.log(`listening on http://localhost:${port}/canvas-multi/`);
    console.log(`listening on http://localhost:${port}/css/`);
    console.log(`listening on http://localhost:${port}/gsap/`);
    console.log(`listening on http://localhost:${port}/pixi-js/`);
    console.log(`listening on http://localhost:${port}/test/`);
    console.log(`listening on http://localhost:${port}/web-worker/`);
});