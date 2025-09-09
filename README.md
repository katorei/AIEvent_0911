# ハンズオンの進め方
「デザイナーのためのAIツールハンズオン Cursor編」における、ハンズオンの進め方ドキュメントです。
画面に投影しますが、ご自身のペースで進められそうな方はこちらのドキュメントを参考にしてください！

## Cursorの起動

### 1. Cursorをインストール

- https://cursor.com/ja

### 2. 教材のファイルをGithubからダウンロード

- Githubの右上のCodeを押してください
- ``Download ZIP`` からzipファイルをダウンロードしてください
- <img width="300" height="366" alt="image" src="https://github.com/user-attachments/assets/73b8ce64-4716-468d-bd43-4cc98564bdc1" />


### 3. 教材をCursorで開く

- 教材のzipファイルを解凍
- Cursorを開く
- ファイル＞フォルダーを開く…から、「site」フォルダを開く

### 4. 教材をプレビュー

- siteフォルダを開く
- 「index.html」を開く
- 顧客管理画面が開けばOK

### 5. Cursorチャットの使い方

- 右上のアイコンを押します
- チャットが出てきます

## ダウンロードコンテンツをもとに、2種類の体験ができます！

時間の都合上、すべてのコンテンツを口頭で説明できないので、ご自身で進められる方は、お好きな箇所をドキュメントをもとに進めてみてください！

<details>

<summary> やさしさ実装 </summary>

## やさしさ実装
「顧客管理一覧」「顧客詳細」を以下の内容で改善してください。

### 実装方法：課題を元に、Cursorのチャット欄に「〜したい」と自然言語で書くだけ！
- もしうまくいかなければ、周りのサポートの方に聞いてみましょう！

### まずはCursorに画面の説明をしてもらおう！
- ``このページの仕様を説明して！``と聞いてみましょう。
- 実際のプロダクションでは、表面上のUIからは読み取れない複雑な仕様があるので、コードから正確な仕様を把握するのに役立ちます。

### 課題をやってみよう！
- 答えはあくまで実装結果の参考なので、必ずしも同じ結果にならなくてOKです！修正箇所の参考にしてください。

### **Level1：スタイル調整**
- ステータスの「active」と「enterprise」の色が近すぎるので違う色にしてください
    - <details>
        <summary>答え</summary><img width="266" height="171" alt="image" src="https://github.com/user-attachments/assets/74be8e44-92ff-4d85-aefc-c18ce8ea7b12" /></details>
- フォームのタイトルとフォームが近すぎるので、もう少し余白を広げてください
    - <details>
        <summary>答え</summary></details>

### **Level2：動きを含む調整**
- リストをクリックしたら詳細に遷移できるようにしてください
    - <details>
        <summary>答え</summary>
        <img width="700" height="133" alt="image" src="https://github.com/user-attachments/assets/f57bbb7c-78d8-4bd2-b059-ffeb9bfc9d87" /></details>
- メールアドレスをリストからコピーできるようにしてください
    - <details>
        <summary>答え</summary>
        <img width="259" height="120" alt="image" src="https://github.com/user-attachments/assets/38d04ef3-8f4a-4cbd-92ad-cfb4cf06eb05" /></details>
- 新規顧客追加をするときに空欄で保存できないようにしてください
    - <details>
        <summary>答え</summary><img width="700" height="506" alt="image" src="https://github.com/user-attachments/assets/eccde3fd-7ada-489d-bbaa-64e09459c987" /></details>
    
### **Level3：好きなデザインに調整**
- Level2で行った改善に関連する調整 or 自由に調整してみましょう！
- 例：
    - メールアドレスをコピーした後にToastが出るようにする
    - 新規顧客追加をするときのバリデーションやToastをいい感じにする
    - メモ欄に現在の文字数と文字数制限を表示する
</details>

<details>
<summary> 要望から仕様作成 </summary>
</details>
