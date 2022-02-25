const {api_item} = require("./Common");
const post_sql_func = (req) => {
    return `
        insert into game (
            name,
            support,
            pole,
            description,
            content,
            imageUrl,
            available
        ) VALUES (
            '${req.body['name']}',
            '${req.body['support']}',
            '${req.body['pole']}',
            '${req.body['description']}',
            '${req.body['content']}',
            '${req.body['thumbnail']}',
            ${req.body['available']}
        );
        `;
}
module.exports = async (context, req) => await api_item("game", post_sql_func, context, req);