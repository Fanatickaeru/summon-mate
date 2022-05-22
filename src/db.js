function dataset(){
    const data_ob={
        "id":0,
        "成長":{
            "区分":"",
            "必要経験値":0
        },
        "ステータス":{
            "MHP":  {"_num":0,"_rank":0},
            "MMP":  {"_num":0,"_rank":0},
            "ATK":  {"_num":0,"_rank":0},
            "DEF":  {"_num":0,"_rank":0},
            "AGL":  {"_num":0,"_rank":0},
            "MGC":  {"_num":0,"_rank":0},
            "SPR":  {"_num":0,"_rank":0},
            "TOTAL":{"_num":0,"_rank":0},
        }
    };
    return(data_ob);
}

async function start(){
    const sqlPromise = initSqlJs({
        // locateFile: file => 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/${file}'
        locateFile: file => '../datas.db'
    }).then(SQL =>{
        const db = new SQL.Database();
        // const sqlFilePath="../datas.db";
        // const dataPromise=fetch(sqlFilePath).then(res => res.arrayBuffer());
        // const [SQL,buf] = await Promise.all([sqlPromise,dataPromise]);
        // const db = new SQL.Database(new Uint8Array(buf));
        let query="select * from STATUS where ID="+String(id)+";";
        let status=db.exec(query);
        console.log(status);
        console.log(typeof(status));
        return(db);
    });
}

async function GetStatus(id){
    let data=dataset();
    let db=await start();
    // let query="select * from STATUS where ID="+String(id)+";";
    // let status=db.exec(query);
    // console.log(status);
    // console.log(typeof(status));
    // query="select id,rank() over(order by MHP desc)"
}

export {GetStatus};

/*
data.html用
keys=["MHP","MMP","ATK","DEF","AGL","MGC","SPR"]
select 成長区分,必要経験値 from STATUS,glows where id=[変数id] group by 成長区分;
keys.forEach(function(element){
    select [element] as [element]_num,rank() over(order by [element])as [element]_rank from STATUS where id=[変数id]; 
})
select MHP+MMP+ATK+DEF+AGL+MGC+SPR as TOTAL_num,rank() over(order by MHP+MMP+ATK+DEF+AGL+MGC+SPR)as TOTAL_rank from STATUS where id=[変数id]

statuslist.html用
keys=["MHP","MMP","ATK","DEF","AGL","MGC","SPR"]
item=keys || 成長区分 || TOTAL
select rank() over(order by [item] desc)as rank,* from STATUS;




*/