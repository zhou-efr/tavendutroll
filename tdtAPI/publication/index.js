module.exports = async function (context, req) {
    let sql = `select * from publication`;
    output_res(context.res, sql, connection);
};