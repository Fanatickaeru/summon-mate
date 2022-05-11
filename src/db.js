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

