const Router = require("koa-router");
const ObjectID = require("mongodb").ObjectID;

const securedRouter = new Router();

securedRouter.get("/people", async (ctx) => {
    ctx.body = await ctx.app.people.find().toArray();
});

securedRouter.post("/people", async (ctx) => {
    ctx.body = await ctx.app.people.insertOne(ctx.request.body);
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

module.exports = securedRouter;