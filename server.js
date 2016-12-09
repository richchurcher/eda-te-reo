import koa from 'koa'
import koaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'

const app = new koa()
const router = new koaRouter()

app.use(koaBody())

router.get('/', (ctx, next) => {
  ctx.body = 'Yup.'
})

app
  .use(router.routes())
  .use(router.allowedMethods())

export default app
