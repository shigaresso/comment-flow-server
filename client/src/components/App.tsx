import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const App = (props: { port: any; }) => {
  // 最初に呼び出された時のみの処理にしたい
  useEffect(() => {
    const socket = io(`http://localhost:${props.port}`);

    socket.on("connect", () => {
      console.log("socket.io server に接続しました");
    });

    socket.on('spread message', (strMessage) => {
      // OPENRECのコメントがスタンプの場合は処理しない
      if (strMessage.length == 0) return;
      console.log(strMessage);
    });
  });

  return (
    <>yaaaaaaaaafdfasdf
    </>
  );
}

export default App;
