const Koa = require("koa");
const cors = require('@koa/cors');
const BodyParser = require("koa-bodyparser");
const logger = require('koa-logger');
const jwt = require("./jwt");
const publicRouter = require('./routes/public-routes');
const securedRouter = require('./routes/secured-routes');

const app = new Koa();
app.use(cors());
require("./mongo")(app);


app.use(BodyParser());
app.use(logger());


app.use(publicRouter.routes()).use(publicRouter.allowedMethods());
app.use(jwt.errorHandler()).use(jwt.jwt());


app.use(securedRouter.routes()).use(securedRouter.allowedMethods());
app.listen(3002);
