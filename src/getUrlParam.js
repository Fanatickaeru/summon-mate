async function getAllUrlParam(){// url内に埋め込まれたパラメータをすべて取り出す
    let pageUrl=window.location.search.substring(1);// windowのurlを取り出す
    let urlVar = pageUrl.split('&');// '&'で切り分け
    let paramlist=[];
    urlVar.forEach(function(element){// '&'で切り取った中身を'='で切り分ける
        let param=element.split('=');
        paramlist.push(param);
    });
    return new Promise((resolve,reject)=>{
        resolve(paramlist)
    });
}

async function getUrlParam(param){// url内に埋め込まれたパラメータから目的のものを取り出す
    console.log("call function getUrlParm");
    console.log(param)
    getAllUrlParam().then((res)=>{
        console.log(res);
        res.forEach(function(element){
            if(element[0]==param) return new Promise((resolve,reject)=>{
                resolve(decodeURI(element[1]));// element[0]==Paramの内容を返す
            });
        });
    });
}

export {getUrlParam};