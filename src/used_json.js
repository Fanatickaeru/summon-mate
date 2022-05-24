function list(dpath){// monster.htmlの番号順リストを出力する
    let request = new XMLHttpRequest();// webサーバ内のファイルにアクセスするため

    request.open('GET',dpath);// サーバ内のpath先のファイルにアクセスる
    request.send();
    request.onreadystatechange=()=>{
        if(request.readyState==4 && request.status==200){// 接続に成功した場合
            let json=JSON.parse(request.responseText);
            let list=document.getElementById("list");// <id="list">にアクセスする
            let listitem="";
            let keys=Object.keys(json);// jsonからkeyを取り出しリスト化する

            for(let i=0;i<keys.length;i++){// keyの数だけ行を増やす
                listitem=listitem+'<tr><td>'+keys[i]+'</td><td><a href="data.html?id='+keys[i]+'">'+json[keys[i]]["名前"]+'</a></td></tr>';
            }
            list.innerHTML=listitem;// 出力
        }
    }
}

function data(dpath,id){// data.htmlのデータを出力する
    // 正直、クソグラム
    let request = new XMLHttpRequest();

    request.open('GET',dpath);
    request.send();
    request.onreadystatechange=()=>{
        if(request.readyState==4 && request.status==200){
            let json=JSON.parse(request.responseText);
            console.log(json);
            console.log(id);
            json=json[String(id)];
            // console.log(json);
            document.title=id+":"+json["名前"];//titleを変更する
            const list=[//htmlのidとjsonのkeyを対応つけるためのリスト
                ["name","名前"],
                ["attri","属性"],//
                ["group","系統"],//
                ["magic","魔法"],//
                ["encounter","説明","最短入手経路"],
                ["exp","説明","コメント"]
            ];

            list.forEach(function(element){// listの中身を参照しながらループ
                // console.log(element);
                let item=document.getElementById(element[0]);// html内のlist[][0]のidの要素にアクセス
                let text ="";// htmlに出力する文字列
		        let data=json[element[1]]// jsonのlist[][1]の要素にアクセス
                // console.log(data);
                if(element.length == 2){// list[]の長さが2の場合の処理
                    // console.log(data,typeof(data));
                    if(typeof(data)!="string" & data[0]!=""){// dataが文字列型ではなく、data[0]が""ではない場合の処理
                        let len=data.length;// dataの要素の数
                        let i=0;// カウント関数
                        data.forEach(function(element){// dataの中身を参照しながらループ
                            text = text + element;// textにdata[]を追加していく
                            i++;
                            if(i < len) text = text+",";// iが要素の数ではないなら、末尾に","を付ける
                        });
                    }
                    // dataが文字列型ではなく、data[0]が""である場合、textを"--"にする
                    else if(typeof(data)!="string" & data[0]=="") text="--";
                    // dataが文字列であり、""ではない場合、textをdataにする
                    else if(typeof(data)=="string" & data!="") text=data;
                    // dataが文字列であり、""である場合、textを"--"にする
                    else if(typeof(data)=="string" & data=="") text="--";
                    // 上記のいずれにも該当しない場合
                    else;
                }
                else if(element.length == 3){// listの長さが3の場合の処理
                    data=data[element[2]];
                    // console.log(data);
                    if(typeof(data)!="string" & data[0]!=""){// dataが文字列型ではなく、data[0]が""ではない場合の処理
                        data.forEach(function(element){// dataの中身を参照しながらループ
                            text = text + "<tab>"+element+"<br>";// textにdata[]を追加していく
                        });
                    }
                    // dataが文字列型ではなく、data[0]が""である場合、textを"--"にする
                    else if(typeof(data)!="string" & data[0]=="") text="--";
                    // dataが文字列であり、""ではない場合、textをdataにする
                    else if(typeof(data)=="string" & data!="") text=data;
                    // dataが文字列であり、""である場合、textを"--"にする
                    else if(typeof(data)=="string" & data =="") text="--";
                    // 上記のいずれにも該当しない場合
                    else;
                }
                else;// listの長さが2と3以外の場合の処理
                comsole.log(text);
                console.log(text);
                item.innerHTML=text;
            });
        }
    }
    /*
		<id="name">		:	名前
		<id="attri">	:	属性
		<span id="growp">	:	系統
		<span id="magic">	:	魔法
		<span id="glows">	:	成長区分
		<span id="glows_exp">	:	必要経験値
		<span id="encounter">	:	説明:最短入手経路
		<id="exp">	:	説明:コメント

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
	*/
}


// 関数listと関数dataをmoduleとしてexportする
export {list,data};
