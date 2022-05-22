export function draw(id,type,dataObj){// グラフを描画する・moduleとして呼び出せるようにexportする
    const path="../chart/"
    let ctx=document.getElementById(id);// html内の変数idの要素にアクセスする
    let request = new XMLHttpRequest();
    request.open('GET',path+String(type)+".json");// chartを描画するために必要なデータを保存したjsonファイルを開く
    request.send();
    request.onreadystatechange=()=>{
        if(request.readyState==4 && request.status==200){// 接続に成功した場合
            let data=JSON.parse(request.responseText);
            
            // デモデータ
            let stalist=data["data"]["datasets"][0]["data"].concat(data["data"]["datasets"][1]["data"]);
            // デモデータ終わり
            let max=0;// データの最大値を保存する変数
            // console.log(stalist);
            stalist.forEach(function(element){// stalistの最大値を求める
                if(max<element) max=element;
            });

            data["data"]["datasets"][0]["label"]=document.getElementById("name").innerHTML;// グラフのラベルを<id="name">にする
            data["options"]["scale"]["ticks"]["max"]=parseInt(max+50);// グラフの最大値をmax+50の範囲にする
            // console.log("data",data["options"])
            let chart = new Chart(ctx,data);// グラフを描画する
        }
    }
}