#160個あるhtmlファイルから必要なデータを取り出しjsonに保存するpythonプログラム

import os
from bs4 import BeautifulSoup as bs
import json

PATH = "./サモンメイトデータベース/monster/data/"
filename = ".html"

JSONPATH ="./data/monster.json"

def init(): #JSONPATH先のファイルを"{"のみに書き換える
    with open(JSONPATH,encoding='utf-8',mode='w') as f:
        f.write("{")

def DSET(): #変数の初期化関数その1
    dset={
        "名前":"",
        "属性":[],
        "系統":[],
        "魔法":[],
        "成長区分":"",
        "説明":{
            "最短入手経路":"",
            "コメント":[]
        },
        "ステータス":{},
        "育成効率":{
            "物理型":{"ATK+AGL":0,"効率":0},
            "魔法型":{"MGC+AGL":0,"効率":0,}
        }
    }
    return(dset)

def STATUS(): #変数の初期化関数その2
    status={
        "MHP":0,
        "MMP":0,
        "ATK":0,
        "DEF":0,
        "AGL":0,
        "MGC":0,
        "SPR":0,
        "TOTAL":0
    }
    return(status)

if __name__=="__main__":
    init()
    for i in range(1,161):
        """
        1~160までhtmlを読み込む
        """
        
        path=PATH + str(i) + filename
        print(path+":"+str(os.path.isfile(path))) 
        if(os.path.isfile(path)): #ファイルが存在することを確認する
            with open(path,encoding='utf-8') as f: #ファイルを開いてhtmlファイルとして読み込む
                soup=bs(f,"html.parser")
            source=soup.find(class_="pages") #class="pages"の内容を取り出す
            # print(source)
            p=source.find_all("p") #sourceから全ての<p>を取り出す
            table=source.find("table") #sourceから表を取り出す
            tr=table.find_all("tr") #表から全ての<tr>を取り出す
            data=[] #取り出した<p>の要素を保存する配列
            td=[] #表から取り出したステータスを保存する配列
            # print(p)
            # print(tr)

            for _ in p: #ファイルから取り出した<p>の要素を分ける
                _=_.text.split()
                if(len(_)==1): #要素が1つの場合、配列から文字列にする
                    _=_[0]
                elif(len(_)==2): #要素が2つの場合、":"でくっつける
                    _=_[0]+":"+_[1]
                else: #それ以外
                    data.append(_)
            
            for _ in tr: #表から行を取り出す
                td.append(_.find_all("td"))
            for m in range(len(td)): #表からステータスを取り出す
                for n in range(len(td[m])):
                    td[m][n]=td[m][n].text
            
            # print(data)
            # print()
            # print(td)

            dt=[]
            for _ in data:
                # print(type(_))
                if(type(_) != list): #list型ではない場合、文字列を切り分ける
                    _=_.split(":")
                    if(len(_)==1): #要素が1つの場合、配列から文字列にする
                        _=_[0]
                dt.append(_)
            # print(dt)
            
            datas=DSET() #変数の初期化
            for item in dt:
                # print(item)
                if(type(item)!=list and datas["名前"]==""): #list型ではなく名前が空の場合、名前に代入する
                    datas["名前"]=item
                elif(type(item)!=list and datas["名前"]!=""): #list型ではなく名前が空じゃない場合、無視する
                    pass
                elif(len(item)>3): #長さが3以上のlist型の場合、コメントに代入する
                    datas["説明"]["コメント"]=item
                elif(len(item)!=0 and len(item)<=3): #長さが0以上3以下である場合、それぞれに代入する
                    item[1]=item[1].split("、")
                    if(item[0]=="属性"):
                        datas["属性"]=item[1]
                    elif(item[0]=="系統"):
                        datas["系統"]=item[1]
                    elif(item[0]=="魔法"):
                        datas["魔法"]=item[1]
                    elif(item[0]=="成長"):
                        datas["成長区分"]=item[1][0]
                    elif(item[0]=="最短入手経路"):
                        datas["説明"]["最短入手経路"]=item[1][0].replace("でエンカウント","") #"でエンカウント"を削除する
                else: #なぜか余った場合、無視する
                    pass
            
            sta=STATUS() #変数の初期化
            for item in td:
                if(item[0]!=""): #item[0]が空ではない場合、item[0]にitem[1]を代入する
                    sta[item[0]]=item[1]
            
            datas["ステータス"]=sta #ステータスにstaを代入する
            # print(datas)

            with open(JSONPATH,encoding='utf-8',mode='a+') as f: #テキストファイルとして書き出す
                file=f.read()
                file=file+'"'+str(i)+'":'+str(datas).replace("'",'"')
                if(i < 160): #160番目のデータでなければ","をつける
                    file=file+","
                # print(file)
                f.write(file)
        else: #ファイルが存在しない場合無視する
            pass
    with open(JSONPATH,encoding='utf-8',mode='a+') as f: #ファイルに}を追加する
        file=f.read()
        file=file+"}"
        f.write(file)
    print()
    