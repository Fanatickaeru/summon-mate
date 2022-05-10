function list(dpath){
    let request = new XMLHttpRequest();

    request.open('GET',dpath);
    request.send();
    request.onreadystatechange=()=>{
        if(request.readyState==4 && request.status==200){
            let json=JSON.parse(request.responseText);
            let list=document.getElementById("list");
            let listitem="";
            let keys=Object.keys(json);

            for(let i=0;i<keys.length;i++){
                listitem=listitem+'<tr><td>'+keys[i]+'</td><td><a href="data.html?id='+keys[i]+'">'+json[keys[i]]["名前"]+'</a></td></tr>';
            }
            list.innerHTML=listitem;
        }
    }
}

function data(dpath,id){
    let request = new XMLHttpRequest();

    request.open('GET',dpath);
    request.send();
    request.onreadystatechange=()=>{
        if(request.readyState==4 && request.status==200){
            let json=JSON.parse(request.responseText);
            json=json[String(id)];
            // console.log(json);
            document.title=id+":"+json["名前"];
            const list=[
                ["name","名前"],
                ["attri","属性"],
                ["growp","系統"],
                ["magic","魔法"],
                ["glows","成長区分"],
                ["encounter","説明","最短入手経路"],
                ["exp","説明","コメント"]
            ];

            list.forEach(function(element){
                // console.log(element);
                let item=document.getElementById(element[0]);
                let text ="";
                if(element.length == 2){
                    let data=json[element[1]];
                    // console.log(data,typeof(data));
                    if(typeof(data)!="string"){
                        let len=data.length;
                        let i=0;
                        data.forEach(function(element){
                            text = text + element;
                            i++;
                            if(i < len) text = text+",";
                        });
                    }
                    else if(typeof(data)=="string") text=data;
                    else{}
                }
                else if(element.length == 3){
                    let data=json[element[1]];
                    data=data[element[2]];
                    // console.log(data);
                    if(typeof(data)!="string"){
                        let len=data.length;
                        let i=0;
                        data.forEach(function(element){
                            text = text + "<tab>"+element+"<br>";
                        });
                    }
                    else if(typeof(data)=="string") text=data;
                    else{}
                }
                else{}
                console.log(text)
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

export {list,data};
