import { Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { TagService } from '../../core/service/tag.service'
import { TAG } from '../../../types/tag'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { LowdbUndefinedInterceptor } from '../interceptor/lowdb-undefined.interceptor'

@ApiTags('tag')
@UseInterceptors(LowdbUndefinedInterceptor)
@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get('queryList')
  @ApiOperation({
    summary: 'Get all the tags',
    description: ''
  })
  queryList(): TAG[] {
    return this.tagService.getTagList()
  }

  @Get('queryListWithPostNum')
  @ApiOperation({
    summary: 'Get all tags and count the number of articles in each tag',
    description: ''
  })
  queryListWithPostNum(): TAG[] {
    return this.tagService.getTagListWidthPostNum()
  }

  @Get('query/:idOrTitle')
  @ApiOperation({
    summary: 'Get tag by id or title',
    description: ''
  })
  query(@Param('idOrTitle') idOrTitle: string): TAG {
    return this.tagService.getTagByIdOrTitle(idOrTitle)
  }
}
