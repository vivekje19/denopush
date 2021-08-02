import { Application, config, oakCors } from "./deps.ts";
import { router } from "./routes.ts";

const app = new Application();

// Logger
app.use(async (ctx, next) => {
  await next();
  const _rt = ctx.response.headers.get("X-Response-Time");
  //console.log(`${ctx.request.method} ${ctx.request.url} - ${_rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(
  oakCors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  }),
);

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: parseInt(config()["PORT"]) || 8000 });
