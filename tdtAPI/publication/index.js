const {output_res, connection} = require("../Common");
module.exports = async function (context, req) {
    let sql = `select * from publication`;
    // output_res(context, sql, connection);
    context.res.json({
        "panda": "panda"
    });
};