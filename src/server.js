import koa from 'koa'
import serve from 'koa-static'
import koaRouter from 'koa-router'
import cors from 'kcors'
import translate from 'google-translate-api'
import proverbs from './proverbs'

const app = new koa()
const router = koaRouter()

app.use(cors())
app.use(serve('public'))

const randomIncludeMin = () => Math.floor(Math.random() * proverbs.length)

router.get('/api/proverbs', (ctx, next) => {
  ctx.body = proverbs[randomIncludeMin()]
})

router.get('/api/translate', async (ctx, next) => {
  if (!ctx.query.word) {
    ctx.body = 'Error: you need to specify a word to translate.'
    return
  }
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
