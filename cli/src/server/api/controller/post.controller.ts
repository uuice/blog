import { Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { PostService } from '../../core/service/post.service'
import { ARCHIVES_DATE, LIST_POST_ITEM, POST } from '../../../types/post'
import { LowdbUndefinedInterceptor } from '../interceptor/lowdb-undefined.interceptor'
import { PAGE } from '../../../types/page'

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
  query(@Param('idOrTitle') idOrTitle: string): POST | undefined {
    return this.postService.getPostByIdOrTitle(idOrTitle)
  }

  // TODO: pageQuery
  @Get('pageQuery')
  @ApiOperation({
    summary: "Gets the paging query for post without 'content' | '_content' | '_toc'",
    description: ''
  })
  pageQuery(): {
    currentPage: number
    pageCount: number
    prevPage: number
    nextPage: number
    dataList: Omit<PAGE, 'content' | '_content' | '_toc'>[]
  } {
    return {
      currentPage: 0,
      pageCount: 0,
      prevPage: 0,
      nextPage: 0,
      dataList: []
    }
  }

  // TODO: prevPost
  @Get('prevPost')
  @ApiOperation({
    summary: 'Get the previous post',
    description: ''
  })
  prevPost(): POST | undefined {
    return {} as POST
  }

  // TODO: nextPost
  @Get('nextPost')
  @ApiOperation({
    summary: 'Get the next post',
    description: ''
  })
  nextPost(): POST | undefined {
    return {} as POST
  }
}
