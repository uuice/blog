import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { ConfigService, ROUTER_FORWARDING } from '../../core/service/config.service'

@Injectable()
export class RouteForwardingMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const routes = this.configService.getItem(ROUTER_FORWARDING)
    const originalUrl = req.originalUrl
    const forwardedUrl = routes[originalUrl]
    if (forwardedUrl) {
      req.url = forwardedUrl
    }
    next()
  }
}
