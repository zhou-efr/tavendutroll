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
    context.res.status(200).json({
        text: "Hello from the API"
    });
};