export function draw(id,type){
    const path="../chart/"
    let ctx=document.getElementById(id);
    let request = new XMLHttpRequest();

    request.open('GET',path+String(type)+".json");
    request.send();
    request.onreadystatechange=()=>{
        if(request.readyState==4 && request.status==200){
            let data=JSON.parse(request.responseText);
            
            let Chart = new Chart(ctx,data);
        }
    }
}