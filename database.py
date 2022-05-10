# monster.jsonからステータス部分をデータベースに保存するプログラム

import sqlite3
import json
import pprint

JSONPATH="./data/monster.json"
DBPATH="./datas.db"

if __name__=="__main__":
    conn = sqlite3.connect(DBPATH)
    cur=conn.cursor()
    with open(JSONPATH,encoding='utf-8',mode='r') as f:
        df=json.load(f)

    for i in range(1,161):
        item=df[str(i)]["成長区分"]
        sta=df[str(i)]["ステータス"]
        # pprint.pprint(item,width=40)
        value_l=[i]
        for n in sta:
            value_l.append(int(sta[n]))
        value_l[-1]=item
        print(value_l)
        value_t=tuple(value_l)
        try:
            cur.execute('insert into STATUS values'+str(value_t))
            print("ok")
        except:
            print("error")
            cur.execute('update STATUS SET 成長区分 = "'+item+'" where id='+str(i))
            print("ok")
    conn.commit()
    cur.close()
    conn.close()
    """
    "1":{
        "名前": "スライム", 
        "属性": ["水1"], 
        "系統": ["スライム"], 
        "魔法": ["ポイズン", "アップ"], 
        "成長区分": "B", 
        "説明": {
            "最短入手経路": "オシロ城付近など", 
            "コメント": [
                "お馴染みスライムです。", 
                "ストーリーでは最序盤のみの活躍となりそうですが、", 
                "ステータスを見ると印象ほど弱くはない、といった感じです。", 
                "素材にはなりませんが、対人戦で縛りとしてスライムパを運用する……というのも", 
                "案外難しくないのかも知れません。"
            ]
        }, 
        "ステータス": {
            "MHP": "195", 
            "MMP": "157", 
            "ATK": "215", 
            "DEF": "166", 
            "AGL": "175", 
            "MGC": "209", 
            "SPR": "190", 
            "TOTAL": "1307"
        }, 
        "育成効率": {
            "物理型": {"ATK+AGL": 0, "効率": 0}, 
            "魔法型": {"MGC+AGL": 0, "効率": 0}
        }
    },
    """