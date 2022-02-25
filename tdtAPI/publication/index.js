module.exports = async function (context, req) {
    let res = context.res;
    res.json({
        text: "Hello from the API"
    });
};