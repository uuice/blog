import { Controller, Get, Param } from '@nestjs/common'
import { TagService } from '../../core/service/tag.service'
import { TAG } from '../../../types/tag'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('tag')
@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get('/list')
  list(): TAG[] {
    return this.tagService.getTagList()
  }

  @Get('/listWithPostNum')
  listWithPostNum(): TAG[] {
    return this.tagService.getTagListWidthPostNum()
  }

  @Get(':idOrTitle')
  query(@Param('idOrTitle') idOrTitle: string): TAG {
    return this.tagService.getTagByTitle(idOrTitle)
  }
}
