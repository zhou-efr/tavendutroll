const {api_item} = require("./Common");
const {Request} = require("tedious");
const {error_res, output_res, connection, rows_to_json} = require("../Common");
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

module.exports = async function (context, req) {
    connection.execSql(new Request("select * from publication", (err, rowCount, rows) => {
        if (err) {
            console.log('Impossible de se connecter, erreur suivante :', err);
            context.res.status(500).json({
                error: err
            });
        } else {
            let response = rows_to_json(rows);
            context.res.status(200).json(response);
        }
    }));
};