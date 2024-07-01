import { Controller, Get, Param, Render } from '@nestjs/common'
import { ViewData } from '../../core/helper/viewData'
import { TagService } from '../../core/service/tag.service'

@Controller('tags')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get(':url')
  @Render('tag')
  index(@Param('url') url: string) {
    const viewData = new ViewData()
    viewData.assign('pageType', 'Tag')
    viewData.assign('url', url)
    const tag = this.tagService.getTagByUrl(url)
    viewData.assign('tag', tag)
    return viewData.assign()
  }
}
