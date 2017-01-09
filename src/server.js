import koa from 'koa'
import koaRouter from 'koa-router'
import cors from 'kcors'
import translate from 'google-translate-api'
import proverbs from './proverbs'

const app = new koa()
const router = koaRouter()

app.use(cors())

const randomIncludeMin = () => Math.floor(Math.random() * proverbs.length)

router.get('/api/proverbs', (ctx, next) => {
  ctx.body = proverbs[randomIncludeMin()]
})

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
