export async function write_table(dataObj){
    const keys=["MHP","MMP","ATK","DEF","AGL","MGC","SPR"];
    const labels=["num","rank"];
    console.log(dataObj);
    for(let i=0;i<7;i++){
        for(let n=0;n<labels.length;n++){
            let id=keys[i]+"_"+labels[n];
            let data=String(dataObj["status"][labels[n]][keys[i]]);
            console.log(id,":",data);
            let span=document.getElementById(id);// html内の変数idの要素にアクセスする
            span.innerHTML=data;
        }
    }
    for(let i=0;i<labels.length;i++){
        let id="TOTAL_"+labels[i];
        let data=String(dataObj["TOTAL"][labels[i]]);
        console.log(id,":",data);
        let span=document.getElementById(id);// html内の変数idの要素にアクセスする
        span.innerHTML=data;
    }
}