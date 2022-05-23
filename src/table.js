export async function write_table(dataObj){
    const keys=["MHP","MMP","ATK","DEF","AGL","MGC","SPR"];
    const labels=["num","rank"];
    console.log(dataObj);
    for(let i=0;i<7;i++){
        for(let n=0;n<2;n++){
            let id=keys[i]+"_"+labels[n];
            console.log(id);
            let data=String(dataObj["status"][labels[n]][keys[i]]);
            console.log(data);
            let span=document.getElementById(id);// html内の変数idの要素にアクセスする
            span.innerHTML(data);
        }
    }
}