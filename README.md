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
#### function draw(id,type,dataObj)
    引数
    id[Number]
    type[String(horizontalBar,radar)]
    dataObj[Object]
    返り値

