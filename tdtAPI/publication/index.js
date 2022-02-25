const { Connection, Request} = require("tedious");
const config = {
    authentication: {
        options: {
            userName: process.env.tdtDatabaseUser,
            password: process.env.tdtPassword
        },
        type: "default"
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
connection.connect();
module.exports = async function (context, req) {
    connection.execSql(new Request("select * from publication", (err, rowCount, rows) => {
        if (err) {
            context.res.json({
                error: err
            });
        } else {
            context.res.json(rows);
        }
    }));
};