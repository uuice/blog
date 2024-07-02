// import { Router } from 'express'
import { PageService } from '../core/service/page.service'
import { PageController } from '../front/controller/page.controller'
import { NestExpressApplication } from '@nestjs/platform-express'

export const initDynamicRouter = (app: NestExpressApplication) => {
  const httpAdapter = app.getHttpAdapter()
  const expressApp = httpAdapter.getInstance()
  const pageService = app.get(PageService)
  const pageList = pageService.getPageList()
  // const dynamicRouter = Router()
  pageList.forEach((page) => {
    expressApp.get(`/${page.alias}`, async (req, res) => {
      // const pageController = new PageController(pageService)
      const pageController = app.get(PageController)
      const result = await pageController.index(`${page.alias}`)
      res.render('page', result)
    })
  })
  // Mount the dynamic route to the application root path
  // app.use('/', dynamicRouter)
}
