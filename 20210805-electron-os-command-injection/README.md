# study-electron-os-command-injection

Electron で作成されたアプリに OS コマンドインジェクションの脆弱性を発見した事例とその修正方法を記事にしました。

https://zenn.dev/aktriver/articles/2021-08-electron-os-command-injection

![](./example.png)

## 実行

```sh
yarn install
yarn start
```

`<ディレクトリ名>"; <任意コマンド>#` と入力して `CREATE` をクリックすることで任意コマンドを実行できます。

## 原因

`exec`/`execSync` を使用しているため。

詳細は記事を確認してください。

## 対策・修正

ベストな方法は `execFile`/`execFileSync` を使用することです。

```javascript
const { execFileSync } = require("child_process");

ipcMain.handle("CREATE_NEW_DIRECTORY", (_event, name) => {
  execFileSync("mkdir", [name]);
});
```
