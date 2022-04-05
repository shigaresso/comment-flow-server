import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { calcCommentRow } from './calc';
const arrayCount = 11;
const App = (props) => {
  // 最初に呼び出された時のみの処理にしたい
  useEffect(() => {
    const rows = Array(arrayCount)
            .fill()
            .map(_ => ({
                bornTime: 0,
                speed: 0,
                width: 0,
            }));


    const container = document.getElementById('root');
    for (let i = 0; i < arrayCount; i++) {
        const element = document.createElement('div');
        element.className = 'row';
        element.id = `row${i}`;
        container.appendChild(element);
    }
    const socket = io(`http://localhost:${props.port}`);

    socket.on("connect", () => {
      console.log("socket.io server に接続しました");
    });

    socket.on('spread message', (strMessage) => {
      // OPENRECのコメントがスタンプの場合は処理しない
      if (strMessage.length == 0) return;
      console.log(strMessage);
      const { comment, index } = calcCommentRow(strMessage, rows);
      if (!comment) return;
        const div_text = document.createElement("div");
        div_text.className = "comment";
        const placeholder = document.getElementById(`row${index}`);
        div_text.innerText = strMessage;
        placeholder.appendChild(div_text);

        div_text.addEventListener("animationend", () => div_text.remove());
    });

  }, []);

  return (
    <>
    </>
  );
}

export default App;
