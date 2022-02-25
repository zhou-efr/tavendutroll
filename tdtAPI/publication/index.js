const { Connection, Request} = require("tedious");
const {config, rows_to_json} = require("../Common");
const connection = new Connection(config);
connection.connect();
module.exports = async function (context, req) {
    connection.execSql(new Request("select * from publication", (err, rowCount, rows) => {
        if (err) {
            context.res.json({
                error: err
            });
        } else {
            let response = rows_to_json(rows);
            context.res.json(response);
        }
    }));
};