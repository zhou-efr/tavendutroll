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
const connection = new Connection(config);
connection.connect((err) => {
    if (err) {
        context.res.json({
            "context" : "connection",
            error: err
        });
    }else{
        module.exports = async function (context, req) {
            connection.execSql(new Request("select * from publication", (err, rowCount, rows) => {
                if (err) {
                    context.res.json({
                        "context" : "call",
                        error: err
                    });
                } else {
                    let response = rows_to_json(rows);
                    context.res.json(response);
                }
            }));
        };
    }
});

const post_sql_func = (req) => {
    return `
        insert into publication (
            name,
            author,
            pole,
            description,
            content,
            imageUrl
        )
        VALUES (
            '${req.body['name']}',
            '${req.body['author']}',
            '${req.body['pole']}',
            '${req.body['description']}',
            '${req.body['content']}',
            '${req.body['thumbnail']}'
        )`;
}
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

