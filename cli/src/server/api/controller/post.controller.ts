import { Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { PostService } from '../../core/service/post.service'
import { ARCHIVES_DATE, LIST_POST_ITEM, POST } from '../../../types/post'
import { LowdbUndefinedInterceptor } from '../interceptor/lowdb-undefined.interceptor'

@ApiTags('post')
@UseInterceptors(LowdbUndefinedInterceptor)
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('queryListByRecent/:num')
  @ApiOperation({
    summary: 'Get the latest N records',
    description: ''
  })
  queryListByRecent(@Param('num') num: number): LIST_POST_ITEM[] {
    return this.postService.getRecentPosts(num)
  }

  @Get('archivesByDateYear')
  @ApiOperation({
    summary: 'Articles are archived through the years',
    description: ''
  })
  archivesByDateYear(): ARCHIVES_DATE {
    return this.postService.getArchivesByDateYear()
  }

  @Get('query/:idOrTitle')
  @ApiOperation({
    summary: 'Get post by id or title',
    description: ''
  })
  query(@Param('idOrTitle') idOrTitle: string): POST {
    return this.postService.getPostByIdOrTitle(idOrTitle)
  }
}
