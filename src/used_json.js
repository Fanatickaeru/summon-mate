function list(dpath){
    let request = new XMLHttpRequest();

    request.open('GET',dpath);
    request.send();

    request.onreadystatechange=()=>{
        if(request.readyState==4 && request.status==200){
            let json=JSON.parse(request.responseText);
            console.log(json);
            
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
            console.log(json);
        }
    }
}

export {list,data};