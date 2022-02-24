module.exports = async function (context, req) {
    console.log(context);
    console.log(req);
    context.res.json({
        text: "Hello from the API"
    });
}