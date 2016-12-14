import koa from 'koa'
import koaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import translate from 'google-translate-api'

const app = new koa()
const router = koaRouter()

app.use(koaBody())

router.get('/api/translate', async (ctx, next) => {
  const translation = await translate(ctx.query.word, {
    from: 'en',
    to: 'mi'
  })
  ctx.body = translation.text
})

app
  .use(router.routes())
  .use(router.allowedMethods())

export default app
