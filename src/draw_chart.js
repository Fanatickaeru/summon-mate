export function draw(id,type,dataObj){// グラフを描画する・moduleとして呼び出せるようにexportする
    const path="../chart/"
    let ctx=document.getElementById(id);// html内の変数idの要素にアクセスする
    let request = new XMLHttpRequest();
    request.open('GET',path+String(type)+".json");// chartを描画するために必要なデータを保存したjsonファイルを開く
    request.send();
    request.onreadystatechange=()=>{
        if(request.readyState==4 && request.status==200){// 接続に成功した場合
            let setlist=JSON.parse(request.responseText);

            let MStatus=[];
            let MAvg=[];
            if(type=="radar"){
                MStatus=Object.values(dataObj["status"]["num"]);
                MAvg=Object.values(dataObj["avg"]);
            }
            else if(type=="horizontalBar"){
                MStatus.push(dataObj["TOTAL"]["num"]);
                MAvg.push(dataObj["TOTAL"]["avg"]);
            }
            // console.log(MStatus);
            // console.log(MAvg);

            setlist["data"]["datasets"][0]["data"]=MStatus;
            setlist["data"]["datasets"][1]["data"]=MAvg;

            let stalist=MStatus.concat(MAvg);
            let max=0;// データの最大値を保存する変数

            // console.log(stalist);

            stalist.forEach(function(element){// stalistの最大値を求める
                if(max<element) max=element;
            });

            setlist["data"]["datasets"][0]["label"]=document.getElementById("name").innerHTML;// グラフのラベルを<id="name">にする
            if(type=="radar"){
                setlist["options"]["scale"]["ticks"]["max"]=parseInt(max+50);// グラフの最大値をmax+50の範囲にする
            }
            else if(type=="horizontalBar"){            
                // console.log("data:",setlist["options"]["scales"]["xAxes"][0]["ticks"]);
                setlist["options"]["scales"]["xAxes"][0]["ticks"]["max"]=parseInt(max+20);
                console.log(setlist)
            }
            let chart = new Chart(ctx,setlist);// グラフを描画する
        }
    }
}