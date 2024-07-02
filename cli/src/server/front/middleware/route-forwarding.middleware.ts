import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { ConfigService, ROUTER_FORWARDING } from '../../core/service/config.service'
import { PageService } from '../../core/service/page.service'

@Injectable()
export class RouteForwardingMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly pageService: PageService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const routes = this.configService.getItem(ROUTER_FORWARDING)
    const originalUrl = req.originalUrl
    const forwardedUrl = routes[originalUrl]
    // console.log(originalUrl)
    // // If the route is configured with the page format and page data can be found in the pageServer, the url is modified
    // if (/\/([\w-]+)/.test(originalUrl)) {
    //   // make sure the url is page
    //   if (/\/([\w-]+)/.test(originalUrl)) {
    //     const alias = originalUrl.match(/\/([\w-]+)/)[1]
    //     const pageData = await this.pageService.getPageByAlias(alias)
    //     if (pageData) {
    //       req.originalUrl = '/page/' + alias
    //       req.url = '/page/' + alias
    //       console.log('forwarding')
    //       return res.render('page', { url: '/page/' + alias })
    //     }
    //   }
    // }
    if (forwardedUrl) {
      req.url = forwardedUrl
    }
    next()
  }
}
