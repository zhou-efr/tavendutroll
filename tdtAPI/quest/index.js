const {api_item} = require("./Common");
const post_sql_func = (req) => {
    return `
        insert into quest (
            name,
            discordId,
            description,
            jeux,
            player,
            content,
            imageUrl,
            startDate
        ) VALUES (
            '${req.body['name']}',
            '${req.body['discordId']}',
            '${req.body['description']}',
            '${req.body['jeux']}',
            ${req.body['player']},
            '${req.body['content']}',
            '${req.body['thumbnail']}',
            '${req.body['startDate']}'
        )`;
}
module.exports = async (context, req) => await api_item("quest", post_sql_func, context, req);