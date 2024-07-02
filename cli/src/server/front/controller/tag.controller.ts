import { Controller, Get, Param, Render, Res } from '@nestjs/common'
import { ViewData } from '../../core/helper/viewData'
import { TagService } from '../../core/service/tag.service'
import { Response } from 'express'

@Controller('tags')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get(':url')
  @Render('tag')
  index(@Param('url') url: string, @Res() res: Response) {
    const viewData = new ViewData()
    viewData.assign('pageType', 'Tag')
    viewData.assign('url', url)
    const tag = this.tagService.getTagByUrl(url)
    viewData.assign('tag', tag)
    viewData.assign(res.locals)
    return viewData.assign()
  }
}
