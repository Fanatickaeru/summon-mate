export function draw(id,type){
    const path="../chart/"
    let ctx=document.getElementById(id);
    let request = new XMLHttpRequest();
    request.open('GET',path+String(type)+".json");
    request.send();
    request.onreadystatechange=()=>{
        if(request.readyState==4 && request.status==200){
            let data=JSON.parse(request.responseText);

            let stalist=data["data"]["datasets"][0]["data"].concat(data["data"]["datasets"][1]["data"]);
            let max=0;
            // console.log(stalist);
            stalist.forEach(function(element){
                if(max<element) max=element;
            });

            data["data"]["datasets"][0]["label"]=document.getElementById("name").innerHTML;
            data["options"]["scale"]["ticks"]["max"]=parseInt(max+50);
            // console.log("data",data["options"])
            let chart = new Chart(ctx,data);
        }
    }
}
