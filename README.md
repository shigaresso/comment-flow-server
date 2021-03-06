# どのようなプログラムなのか？

Twitch、Openrec、YouTube いずれかのサイトの配信に流れるコメントを、ニコニコ風に流れるコメントとして、ブラウザに表示するプログラムです。  

https://github.com/shigaresso/send-comment-from-browser  
と組み合わせて利用します。  
こちらは、そのプログラムのサーバー側となります。  

実践的な使い方としては、配信者が OBS Studio のブラウザ機能と組み合わせて利用するものとして考えています。  
背景の緑色はクロマキーを利用し、透過させて下さい。  

以下のように動作します。(実際の動きは画像と比較すると、より滑らかに動きます)  

![3qh3q-b47ne](https://user-images.githubusercontent.com/70837100/147489704-0f082eb9-d88d-4cb5-918e-85063773064d.gif)  

## なぜ複数の HTML ファイルが存在するのか？  

コメント量が多い配信の時に、流れているコメントがカクツク場合があり、その改善のために様々な技術を試しています。  
常にフレームレートを 60 fps 出したいのですが処理が重いようで、中々実現させることが出来ません。  
基本的には 『GPU を用いた移動処理』 > 『CPU を用いた移動処理』になるようなので、原則 GPU を用いるようにしています。    
利用している技術としては、作成した時系列順に以下の通りです。  

|技術|選定理由|余談|
|--|--|--|
|CSS|GPU を用いた移動の処理|最初に作成したものだが、他の技術を用いたものと比較してもさほどパフォーマンスの違いを感じない|
|GSAP|GPU を用いた移動の処理|移動するごとに再レンダリングされるので fps が低い、テキストの縁取りをすると異常に重たくなる|
|web-worker|別スレッドで処理を行うことで UI で用いるメインスレッドの負担を減らす|別スレッドでは DOM の操作を行えないので DOM 生成はメインスレッドで行わなければいけない|
|canvas|canvas をいきなり GPU 処理させるのではなく、その前にどのように書くか試したかった|canvas はバックグラウンドスレッドでも用いることが出来るようなので、画面をメインスレッド、サブスレッドで分割し、1 つの画面を作れば一番のパフォーマンスを発揮するかもしれない|
|PIXI.js|GPU を用いて canvas の処理をさせる|実装を詰められていないからか canvas とのパフォーマンスの変化を感じない|

https://github.com/shigaresso/react-comment-layout  
↑仮想 DOM を用いることで、再レンダリングの負担が減るようなので、作りかけではありますが、React を用いたものもあります。  
現在、コメントが流れる所までは作成出来ていません。  

## 利用方法  

リポジトリをダウンロードした後、プログラムフォルダの client、server それぞれのターミナルで  

```zsh
npm i
```

を実行し、その後、server フォルダ内で  

```zsh
npm run start
```

を実行します。  
また、この時に PORT 番号 10010 を利用しています。  
この時に、

```zsh
listening on http://localhost:10010/canvas/
listening on http://localhost:10010/css/
listening on http://localhost:10010/gsap/
listening on http://localhost:10010/pixi-js/
listening on http://localhost:10010/web-worker/
```

などとターミナルに表示されるので好きな URL をブラウザで表示して下さい。  

https://github.com/shigaresso/send-comment-from-browser  
が正常に動作している場合、先ほど選んだ URL のブラウザに配信のコメントが流れ出します。  
配信のブラウザのタブをバックグラウンドにするとコメントの送信が中断される場合があるため、バックグラウンドにしないように注意して下さい。  

## ブランチのバージョンについて
- ver 7.0  
worker を用いたマルチスレッドにおいて buffer した canvas を用いる html を追加した。  
- ver 6.0  
コメントの canvas を 1 回目だけ描画するようにした buffer canvas の追加。  
- ver 5.8  
コメント 1 行ずつを Web Worker 上の canvas で処理するようにした。  
- ver 5.7  
WebWorker をクラス化  
- ver 5.6  
Pixi.js の HTML ファイルでも npm パッケージからモジュールとしてインポートが可能になった。  
- ver 5.5  
canvas、GSAP の HTML ファイルでも npm パッケージからモジュールとしてインポートが可能になった。  
- ver 5.4  
socket.io のクライアント側を今までは スクリプトファイルから読み込んでいたが、npm パッケージから JavaScript にモジュールとしてインポート出来るようになった。  
現在は、CSS バージョンのみで利用可能。  
- ver 5.3  
PIXI.js 版もクラスを用いた方式に変化した。  
- ver 5.2  
GSAP 版もクラスを用いた方式に変化した。  
- ver 5.1  
CSS 版がクラスを用いた状態の持ち方に変化した。  
- ver 5.0  
Pixi.js 版の作成完了。  
- ver 4.0  
canvas 版の HTML も完成。
- ver 3.0  
CSS, GSAP, Worker-DOM の 3 種類の HTML を作成。 
ただし、Worker-DOM は正しく動作してない事が後で判明した。(現在は Worker-DOM のファイルは削除済み)   
JavaScript をモジュール化した。  
- ver 2.0  
コメントの移動方式を CSS -> GSAP に変更。  
- ver 1.0  
CSS でコメントが移動するものを作成した。  