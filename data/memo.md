# 計算系のメモ
## [育成効率][効率]<br>
* ### 魔法型<br>
    > (AGL+MGC)*成長係数+round(TOTAL/4) <br>
* ### 物理型<br>
    > (AGL+ATK)*成長係数+round(TOTAL/4)<br>

## 成長係数・必要経験値<br>
<table>
    <tr><th>成長区分</th><th>必要経験値</th><th>成長係数</th></tr>
    <tr><td>A</td><td>n/a</td><td>1.0</td></tr>
    <tr><td>B</td><td>2473520</td><td>1.0</td></tr>
    <tr><td>C</td><td>3092390</td><td>0.8</td></tr>
    <tr><td>D</td><td>n/a</td><td>0.66</td></tr>
</table>

## DB化する場合<br>
* ### DB1<br>
<table><tr>
    <th>ID</th>
    <th>MHP</th>
    <th>MMP</th>
    <th>ATK</th>
    <th>DEF</th>
    <th>AGL</th>
    <th>MGC</th>
    <th>SPR</th>
    <th>成長区分</th>
</tr></table>

* ### DB2<br>
<table><tr>
    <th>成長区分</th>
    <th>必要経験値</th>
    <th>成長係数</th>
</tr></table>