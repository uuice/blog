import { SysConfigService } from '../../core/service/sysConfig.service'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class CommonDataMiddleware implements NestMiddleware {
  constructor(private sysConfigService: SysConfigService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Adds public data to the res.locals object
    const sysConfig = this.sysConfigService.getSysConfig()
    res.locals.sysConfig = sysConfig
    // console.log('CommonDataMiddleware emit')
    next()
  }
}
