const {api_item} = require("./Common");
const post_sql_func = (req) => {
    return `
        insert into event (
            name,
            author,
            pole,
            description,
            content,
            imageUrl
        ) VALUES (
            '${req.body.name}',
            '${req.body['author']}',
            '${req.body['pole']}',
            '${req.body['description']}',
            '${req.body['content']}',
            '${req.body['thumbnail']}'
        )`;
}
module.exports = async (context, req) => api_item("event", post_sql_func, context, req);