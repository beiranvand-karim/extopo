const Koa = require("koa");
const Router = require("koa-router");
const cors = require('@koa/cors');
const BodyParser = require("koa-bodyparser");
const logger = require('koa-logger');
const jwt = require("./jwt");
const ObjectID = require("mongodb").ObjectID;
const app = new Koa();
app.use(cors());
require("./mongo")(app);

const router = new Router();
const securedRouter = new Router();

app.use(BodyParser());
app.use(logger());

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

app.use(router.routes()).use(router.allowedMethods());
app.use(jwt.errorHandler()).use(jwt.jwt());


securedRouter.get("/people", async (ctx) => {
    ctx.body = await ctx.app.people.find().toArray();
});

securedRouter.post("/people", async (ctx) => {
    ctx.body = await ctx.app.people.insert(ctx.request.body);
});

securedRouter.get("/people/:id", async (ctx) => {
    ctx.body = await ctx.app.people.findOne({"_id": ObjectID(ctx.params.id)});
});

securedRouter.put("/people/:id", async (ctx) => {
    let documentQuery = {"_id": ObjectID(ctx.params.id)};
    let valuesToUpdate = ctx.request.body;
    ctx.body = await ctx.app.people.updateOne(documentQuery, valuesToUpdate);
});

securedRouter.delete("/people/:id", async (ctx) => {
    let documentQuery = {"_id": ObjectID(ctx.params.id)};
    ctx.body = await ctx.app.people.deleteOne(documentQuery);
});


app.use(securedRouter.routes()).use(securedRouter.allowedMethods());
app.listen(3001);