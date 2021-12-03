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
    console.log("/ へのアクセスがありました")
    /*
        "/" にアクセスがあった時、res.sendFile()によって、
        __dirname(このプログラムのディレクトリのパス)/comment-flow-gsap.htmlを渡す
    */
    res.sendFile(`${__dirname}/public/html/comment-flow-gsap.html`);
});

app.get("/css", (req, res) => {
    console.log("CSS へのアクセスがありました")
    res.sendFile(`${__dirname}/public/html/comment-flow-css.html`);
});

app.get("/web-worker", (req, res) => {
    console.log("webworker へのアクセスがありました")
    // res.sendFile(`${__dirname}/public/html/comment-flow-web-worker.html`);
    res.sendFile(`${__dirname}/public/html/comment-flow-css.html`);

});

app.get("/test", (req, res) => {
    console.log("test へのアクセスがありました")
    res.sendFile(`${__dirname}/public/html/comment-flow-web-worker.html`);
});

app.get("/react", (req, res) => {
    console.log("react へのアクセスがありました")
    res.sendFile(`${__dirname}/public/html/react.html`);
});

// サーバーの起動
server.listen(port, () => {
    console.log(`listening on http://localhost:${port}/gsap/`);
    console.log(`listening on http://localhost:${port}/css/`);
    console.log(`listening on http://localhost:${port}/web-worker/`);
    console.log(`listening on http://localhost:${port}/test/`);
});