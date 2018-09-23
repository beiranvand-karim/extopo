const Router = require("koa-router");
const jwt = require("../jwt");

const router = new Router();

router.get("/", async function (ctx) {
    let name = ctx.request.body.name || "World";
    ctx.body = {message: `Hello ${name}!`}
});

router.post("/auth", async (ctx) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;

    if (username === "user" && password === "pwd") {
        ctx.body = {
            token: jwt.issue({
                user: "user",
                role: "admin"
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