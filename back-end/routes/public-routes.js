const Router = require("koa-router");
const jwt = require("../jwt");

const router = new Router();

router.get("/", async function (ctx) {
    let name = ctx.request.body.name || "World";
    ctx.body = {message: `Hello ${name}!`}
});

router.post("/log-in", async (ctx) => {
    let userName = ctx.request.body.userName;
    let passWord = ctx.request.body.passWord;

    const user = await ctx.app.users.findOne({userName: userName, passWord: passWord});

    if (user) {
        ctx.body = {
            token: jwt.issue({
                user: userName,
                role: passWord
            })
        }
    } else {
        ctx.status = 401;
        ctx.body = {error: "Invalid login"}
    }
});

router.post('/sign-up', async (ctx) => {
    await ctx.app.users.insertOne(ctx.request.body);
    ctx.body = await ctx.app.users.findOne({email: ctx.request.body.email});
});

router.get('/users', async (ctx) => {
    ctx.body = await ctx.app.users.find().toArray();
});

module.exports = router;