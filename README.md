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

### draw_chart.js<br>
writen by uchuukaeru<br>
グラフを描写する為の関数群<br>
関係するファイル：chart/*<br>
#### export function draw(id,type,dataObj)
グラフ描写関数<br>
    引数
        id[Number]
        type[String(horizontalBar,radar)]
        dataObj[Object]
    返り値
        なし
<br>

### getUrlParam.js
writen by uchuukaeru<br>
URLに埋め込まれたパラメータから情報を取り出す関数群<br>
#### function getAllUrlParam()
パラメータから全てのデータを取り出す<br>
    引数
        なし
    返り値
        list
#### export function getUrlParam(param)
パラメータから目的の情報を取り出す<br>
    引数
        param[String]
    返り値
        String

### 