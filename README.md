# summon-mate
# サモンメイトデータベース

## 目的
サモンメイトのモンスター等のデータをまとめたwebページを作成する。

## 目標
* ページの完成
* ~~github.ioにて公開~~ この構造ではできない

## 参加者
* [ふぁなし](https://twitter.com/FanaticSeeker)
* [uchuukaeru](https://twitter.com/uchuukaeru)

## 履歴
2022/4/30 リポジトリ作成<br>
2022/5/09 htmlからjsonへのデータ移行完了(今後、データが追加される予定)<br>
2022/5/10 data.htmlにjsonから読み込んだデータを表示させることに成功<br>
2022/5/10 data.htmlにレーダーチャートを表示させることに成功<br>

## script
### accordion.js<br>
writen by ふぁなし<br>

---
---

### draw_chart.js
writen by uchuukaeru<br>
グラフを描写する為の関数群<br>
関係するファイル：chart/*<br>
#### export function draw(id,type,dataObj)
グラフ描写関数<br>
引数<br>
* id[Number]<br>
* type[String(horizontalBar,radar)]<br>
* dataObj[Object]<br>

返り値<br>
* なし<br>

---
---

### getUrlParam.js
writen by uchuukaeru<br>
URLに埋め込まれたパラメータから情報を取り出す関数群<br>
#### function getAllUrlParam()
パラメータから全てのデータを取り出す<br>    
引数<br>
* なし<br>

返り値<br>
* list<br>

---

#### export function getUrlParam(param)
パラメータから目的の情報を取り出す<br>
引数<br>
* param[String]<br>

返り値<br>
* String<br>

---
---

### sidemenu.js
writen by uchuukaeru<br>
サイドメニューを表示する用の関数群<br>

---
---

### table.js
writen by uchuukaeru<br>
表にデータを表示する関数群<br>
#### export function write_table(dataObj)
表にデータを表示する関数<br>
引数<br>
* dataObj[Object]<br>

返り値<br>
* なし<br>

---
---

### used_json.js
writen by uchuukaeru<br>
jsonからデータを取り出し、webページに表示する関数群<br>
#### export function list(dpath)
引数<br>
* dpath[String]<br>

返り値<br>
* なし<br>
---
#### export function data(dpath,id)
引数<br>
* dpath[String]<br>
* id[String]<br>

返り値<br>
* なし<br>

---
---

### data.html
データを表示するページ用html
#### function status(id)
引数<br>
* id[Number]<br>

返り値<br>
* Object<br>
---

#### async function fromDB(id)
SQLiteデータベースからデータを取り出す
引数<br>
* id[Number]<br>

返り値<br>
* Promise<br>