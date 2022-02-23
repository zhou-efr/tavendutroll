const { Connection } = require("tedious");
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
        port: process.env.tdtDatabasePort,
        rowCollectionOnRequestCompletion: true,
    }
};
const connection = new Connection(config);
connection.connect();
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

module.exports = {
    "connection": connection,
    "rows_to_json": rows_to_json,
};
