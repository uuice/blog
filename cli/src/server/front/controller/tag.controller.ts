import { Controller, Get, Param, Render, Res } from '@nestjs/common'
import { ViewData, mixedDataView } from '../../core/helper/viewData'
import { TagService } from '../../core/service/tag.service'
import { Response } from 'express'
import { SysConfigService } from '../../core/service/sysConfig.service'

@Controller('tags')
export class TagController {
  constructor(
    private readonly tagService: TagService,
    private readonly sysConfigService: SysConfigService
  ) {}

  @Get(':url')
  @Render('tag')
  index(@Param('url') url: string, @Res() res: Response) {
    const viewData = new ViewData()
    viewData.assign('pageType', 'Tag')
    viewData.assign('url', url)
    const tag = this.tagService.getTagByUrl(url)
    viewData.assign('tag', tag)
    viewData.assign(res.locals)
    viewData.assign('sysConfig', this.sysConfigService.getSysConfig())
    return mixedDataView(viewData).assign()
  }
}
