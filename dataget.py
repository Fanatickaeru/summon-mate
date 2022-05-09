import os
from bs4 import BeautifulSoup as bs
import json

PATH = "./サモンメイトデータベース/monster/data/"
filename = ".html"

JSONPATH ="./data/monster.json"

def init():
    with open(JSONPATH,encoding='utf-8',mode='w') as f:
        f.write("{")

def DSET():
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

def STATUS():
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
        # 161
        
        path=PATH + str(i) + filename
        print(path+":"+str(os.path.isfile(path)))
        if(os.path.isfile(path)):
            with open(path,encoding='utf-8') as f:
                soup=bs(f,"html.parser")
            source=soup.find(class_="pages")
            # print(source)
            p=source.find_all("p")
            table=source.find("table")
            tr=table.find_all("tr")
            data=[]
            td=[]
            # print(p)
            # print(tr)

            for _ in p:
                _=_.text.split()
                if(len(_)==1):
                    _=_[0]
                else:
                    if(len(_)==2):
                        _=_[0]+":"+_[1]
                data.append(_)
                # print(_.text.split())
            for _ in tr:
                td.append(_.find_all("td"))
            
            for m in range(len(td)):
                for n in range(len(td[m])):
                    td[m][n]=td[m][n].text
            
            # print(data)
            # print()
            # print(td)

            dt=[]
            for _ in data:
                # print(type(_))
                if(type(_) != list):
                    _=_.split(":")
                    if(len(_)==1):
                        _=_[0]
                dt.append(_)
            # print(dt)
            
            datas=DSET()
            for item in dt:
                # print(item)
                if(type(item)!=list and datas["名前"]==""):
                    datas["名前"]=item
                elif(type(item)!=list and datas["名前"]!=""):
                    pass
                elif(len(item)>3):
                    datas["説明"]["コメント"]=item
                elif(len(item)!=0 and len(item)<=3):
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
                        datas["説明"]["最短入手経路"]=item[1][0].replace("でエンカウント","")
                else:
                    pass
            
            sta=STATUS()
            for item in td:
                if(item[0]!=""):
                    sta[item[0]]=item[1]
            
            datas["ステータス"]=sta
            # print(datas)

            with open(JSONPATH,encoding='utf-8',mode='a+') as f:
                file=f.read()
                file=file+'"'+str(i)+'":'+str(datas).replace("'",'"')
                if(i < 160):
                    file=file+","
                # print(file)
                f.write(file)

                
        else:
            pass
    with open(JSONPATH,encoding='utf-8',mode='a+') as f:
        file=f.read()
        file=file+"}"
        f.write(file)
    print()
    