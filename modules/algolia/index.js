import bodyParser from 'body-parser'
import userRouter from './routers/user'
import getApis from './apis'

export default function () {
  const algoliaConfig = this.options.privateRuntimeConfig.algolia
  const apis = getApis(algoliaConfig)

  // add this middleware first before nuxt's middlewares
  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use(bodyParser.urlencoded())
    app.use('/api/user', userRouter(apis))
  })
}
