function getAllUrlParam(){// url内に埋め込まれたパラメータをすべて取り出す
    let pageUrl=window.location.search.substring(1);// windowのurlを取り出す
    let urlVar = pageUrl.split('&');// '&'で切り分け
    let paramlist=[];
    urlVar.forEach(function(element){// '&'で切り取った中身を'='で切り分ける
        let param=element.split('=');
        paramlist.append(param);
    });
    return(paramlist);
}

function getUrlParam(param){// url内に埋め込まれたパラメータから目的のものを取り出す
    console.log("call function getUrlParm");
    console.log(param)
    let list=getAllUrlParam();
    list.forEach(function(element){
        if(element[0]==Param) return decodeURI(element[1]);// element[0]==Paramの内容を返す
    });
}

export {getUrlParam};