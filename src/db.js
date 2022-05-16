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
        locateFile: file => 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/${file}'
    });

    const sqlFilePath="../datas.db";
    const dataPromise=fetch(sqlFilePath).then(res => res.arrayBuffer());
    const [SQL,buf] = await Promise.all([sqlPromise,dataPromise]);
    const db = new SQL.Database(new Uint8Array(buf));
    return(db);
}

async function GetStatus(id){
    let data=dataset();
    db=await start();
    let query="select * from STATUS where ID={};".format(id);
    let status=db.exec(query);
    console.log(status);
    console.log(typeof(status));
    // query="select id,rank() over(order by MHP desc)"
}

export {GetStatus};

/*
select 成長区分,必要経験値 from STATUS,glows where id=[変数id] group by 成長区分;
select [] as []_num,rank() over(order by [])as []_rank from STATUS where id=[変数id]; 
select MHP+MMP+ATK+DEF+AGL+MGC+SPR as TOTAL_num,rank() over(order by MHP+MMP+ATK+DEF+AGL+MGC+SPR)as TOTAL_rank from STATUS where id=[変数id]


"MHP",
"MMP",
"ATK",
"DEF",
"AGL",
"MGC",
"SPR"



*/