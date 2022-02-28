const { Connection, Request} = require("tedious");
const config = {
    authentication: {
        type: "azure-active-directory-password",
        options: {
            userName: process.env.tdtDatabaseUser,
            password: process.env.tdtPassword
        },
    },
    server: process.env.tdtDatabaseServer,
    options: {
        database: process.env.tdtDatabaseName,
        encrypt: true,
        port: parseInt(process.env.tdtDatabasePort),
        rowCollectionOnRequestCompletion: true,
    }
};
const rows_to_json = (rows) => {
    let output = [];
    for (const rowsKey in rows) {
        let row = {};
        for (const rowKey in rows[rowsKey]) {
            row[rows[rowsKey][rowKey]["metadata"]["colName"]] = rows[rowsKey][rowKey]["value"];
        }
        output.push(row);
    }
    return output;
};
const error_res = (context, err, connection) => {
    if (err) {
        console.log('Impossible de se connecter, erreur suivante :', err);
        context.res.json({
            error: err
        });
        connection.close();
    }
}
const output_res = (context, sql, connection) => {
    connection.execSql(new Request(sql, (err, rowCount, rows) => {
        if (err) {
            error_res(context.res, err)
        } else {
            let response = rows_to_json(rows);
            context.res.json(response);
            connection.close();
        }
    }));
};
const api_item = async (table, post_sql_func, context, req) => {
    const connection = new Connection(config);
    let sql = `select * from ${table}`;
    let id = req.query.id || (req.body && req.body.id);
    await connection.connect(() => {
        switch (req.method) {
            case "POST":
                let post_sql = post_sql_func(req)
                let post_request = new Request(post_sql, (err) => error_res(context, err, connection));
                post_request.on('requestCompleted', () => output_res(context, sql, connection));
                connection.execSql(post_request);
                break;
            case "DELETE":
                if (id){
                    let del_sql = `delete from ${table} where id = ${id}`;
                    let del_request = new Request(del_sql, (err) => error_res(context, err, connection));
                    del_request.on('requestCompleted', () => output_res(context, sql, connection));
                    connection.execSql(del_request);
                } else {
                    error_res(context, "no id given")
                }
                break;
            default: // GET
                if (id) {
                    sql = `select * from ${table} where id = ${id}`;
                }
                output_res(context, sql, connection)
        }
    });
}

module.exports = {
    "rows_to_json": rows_to_json,
    "error_res": error_res,
    "output_res": output_res,
    "api_item": api_item
};
