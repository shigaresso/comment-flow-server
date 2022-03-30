import React, { useState } from 'react';
import { io } from 'socket.io-client';

const App = () => {
  useState(() => {
    const socket = io();

    socket.on("connect", () => {
      console.log("socket.io server に接続しました");
    });
  });

  return (
    <>yaaaaaaaaafdfasdf
    </>
  );
}

export default App;
