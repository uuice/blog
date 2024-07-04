import * as nunjucks from 'nunjucks'
import { NestExpressApplication } from '@nestjs/platform-express'
import { PostService } from '../../core/service/post.service'

export function PostPageList(app: NestExpressApplication): void {
  // tag with endpoint test
  this.tags = ['PostPageList']
  this.parse = function (parser, nodes) {
    const tok = parser.nextToken()
    const args = parser.parseSignature(null, true)
    // !nunjucks has a bug, when args.children is empty
    // add a empty node to args.children
    if (!args.children.length) {
      // Handle empty arguments
      args.addChild(new nodes.Literal(0, 0, ''))
    }
    parser.advanceAfterBlockEnd(tok.value)
    const body = parser.parseUntilBlocks('endPostPageList') // eng tag
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtensionAsync(this, 'run', args, [body]) // async
  }
  this.run = async function (context, args, body, callback) {
    const postService = app.get(PostService)
    context.ctx.postPageList = await postService.getPageQuery(
      parseInt(args.pageIndex) || 1,
      parseInt(args.pageSize) || 10
    )
    const result = new nunjucks.runtime.SafeString(body())
    return callback(null, result)
  }
}

export function PostListByCategory(app: NestExpressApplication): void {
  // tag with endpoint test
  this.tags = ['PostListByCategory']
  this.parse = function (parser, nodes) {
    const tok = parser.nextToken()
    const args = parser.parseSignature(null, true)
    // !nunjucks has a bug, when args.children is empty
    // add a empty node to args.children
    if (!args.children.length) {
      // Handle empty arguments
      args.addChild(new nodes.Literal(0, 0, ''))
    }
    parser.advanceAfterBlockEnd(tok.value)
    const body = parser.parseUntilBlocks('endPostListByCategory') // eng tag
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtensionAsync(this, 'run', args, [body]) // async
  }
  this.run = async function (context, args, body, callback) {
    const postService = app.get(PostService)
    if (args.id) {
      context.ctx.list = await postService.getPostListByCategoryId(args.id)
      const result = new nunjucks.runtime.SafeString(body())
      return callback(null, result)
    } else if (args.title) {
      context.ctx.list = await postService.getPostListByCategoryTitle(args.title)
      const result = new nunjucks.runtime.SafeString(body())
      return callback(null, result)
    } else if (args.id || args.title) {
      context.ctx.list = await postService.getPostListByCategoryUrl(args.url)
      const result = new nunjucks.runtime.SafeString(body())
      return callback(null, result)
    } else {
      const result = new nunjucks.runtime.SafeString('')
      return callback(null, result)
    }
  }
}

export function PostListByTag(app: NestExpressApplication): void {
  // tag with endpoint test
  this.tags = ['PostListByTag']
  this.parse = function (parser, nodes) {
    const tok = parser.nextToken()
    const args = parser.parseSignature(null, true)
    // !nunjucks has a bug, when args.children is empty
    // add a empty node to args.children
    if (!args.children.length) {
      // Handle empty arguments
      args.addChild(new nodes.Literal(0, 0, ''))
    }
    parser.advanceAfterBlockEnd(tok.value)
    const body = parser.parseUntilBlocks('endPostListByTag') // eng tag
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtensionAsync(this, 'run', args, [body]) // async
  }
  this.run = async function (context, args, body, callback) {
    const postService = app.get(PostService)
    if (args.id || args.title) {
      context.ctx.list = await postService.getPostListByTagId(args.id)
      const result = new nunjucks.runtime.SafeString(body())
      return callback(null, result)
    } else if (args.id || args.title) {
      context.ctx.list = await postService.getPostListByTagTitle(args.title)
      const result = new nunjucks.runtime.SafeString(body())
      return callback(null, result)
    } else if (args.id || args.title) {
      context.ctx.list = await postService.getPostListByTagUrl(args.url)
      const result = new nunjucks.runtime.SafeString(body())
      return callback(null, result)
    } else {
      const result = new nunjucks.runtime.SafeString('')
      return callback(null, result)
    }
  }
}

export function PostItem(app: NestExpressApplication): void {
  // tag with endpoint test
  this.tags = ['PostItem']
  this.parse = function (parser, nodes) {
    const tok = parser.nextToken()
    const args = parser.parseSignature(null, true)
    // !nunjucks has a bug, when args.children is empty
    // add a empty node to args.children
    if (!args.children.length) {
      // Handle empty arguments
      args.addChild(new nodes.Literal(0, 0, ''))
    }
    parser.advanceAfterBlockEnd(tok.value)
    const body = parser.parseUntilBlocks('endPostItem') // eng tag
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtensionAsync(this, 'run', args, [body]) // async
  }
  this.run = async function (context, args, body, callback) {
    if (args.id) {
      const postService = app.get(PostService)
      context.ctx.post = await postService.getPostById(args.id)
      const result = new nunjucks.runtime.SafeString(body())
      return callback(null, result)
    } else if (args.title) {
      const postService = app.get(PostService)
      context.ctx.post = await postService.getPostByTitle(args.title)
      const result = new nunjucks.runtime.SafeString(body())
      return callback(null, result)
    } else if (args.url) {
      const postService = app.get(PostService)
      context.ctx.post = await postService.getPostByUrl(args.url)
      const result = new nunjucks.runtime.SafeString(body())
      return callback(null, result)
    } else if (args.alias) {
      const postService = app.get(PostService)
      context.ctx.post = await postService.getPostByAlias(args.alias)
      const result = new nunjucks.runtime.SafeString(body())
      return callback(null, result)
    } else {
      const result = new nunjucks.runtime.SafeString('')
      return callback(null, result)
    }
  }
}

export function PostRecent(app: NestExpressApplication): void {
  // tag with endpoint test
  this.tags = ['PostRecent']
  this.parse = function (parser, nodes) {
    const tok = parser.nextToken()
    const args = parser.parseSignature(null, true)
    // !nunjucks has a bug, when args.children is empty
    // add a empty node to args.children
    if (!args.children.length) {
      // Handle empty arguments
      args.addChild(new nodes.Literal(0, 0, ''))
    }
    parser.advanceAfterBlockEnd(tok.value)
    const body = parser.parseUntilBlocks('endPostRecent') // eng tag
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtensionAsync(this, 'run', args, [body]) // async
  }
  this.run = async function (context, args, body, callback) {
    const postService = app.get(PostService)
    context.ctx.list = await postService.getRecentPosts(parseInt(args.num))
    const result = new nunjucks.runtime.SafeString(body())
    return callback(null, result)
  }
}

export function PostArchive(app: NestExpressApplication): void {
  // tag with endpoint test
  this.tags = ['PostArchive']
  this.parse = function (parser, nodes) {
    const tok = parser.nextToken()
    const args = parser.parseSignature(null, true)
    // !nunjucks has a bug, when args.children is empty
    // add a empty node to args.children
    if (!args.children.length) {
      // Handle empty arguments
      args.addChild(new nodes.Literal(0, 0, ''))
    }
    parser.advanceAfterBlockEnd(tok.value)
    const body = parser.parseUntilBlocks('endPostArchive') // eng tag
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtensionAsync(this, 'run', args, [body]) // async
  }
  this.run = async function (context, args, body, callback) {
    const postService = app.get(PostService)
    // type: tag category  year month
    if (args.type) {
      if (args.type === 'tag') {
        context.ctx.archive = await postService.getArchivesByTag()
        const result = new nunjucks.runtime.SafeString(body())
        return callback(null, result)
      } else if (args.type === 'category') {
        context.ctx.archive = await postService.getArchivesByCategory()
        const result = new nunjucks.runtime.SafeString(body())
        return callback(null, result)
      } else if (args.type === 'year') {
        if (args.categoryId) {
          context.ctx.archive = await postService.getArchivesByCategoryIdDateYear(args.categoryId)
        } else if (args.tagId) {
          context.ctx.archive = await postService.getArchivesByTagIdDateYear(args.tagId)
        } else {
          context.ctx.archive = await postService.getArchivesByDateYear()
        }
        const result = new nunjucks.runtime.SafeString(body())
        return callback(null, result)
      } else if (args.type === 'month') {
        context.ctx.archive = await postService.getArchivesByDateYearAndMonth()
        const result = new nunjucks.runtime.SafeString(body())
        return callback(null, result)
      }
    } else {
      const result = new nunjucks.runtime.SafeString('')
      return callback(null, result)
    }
  }
}

export function PostPrev(app: NestExpressApplication): void {
  // tag with endpoint test
  this.tags = ['PostPrev']
  this.parse = function (parser, nodes) {
    const tok = parser.nextToken()
    const args = parser.parseSignature(null, true)
    // !nunjucks has a bug, when args.children is empty
    // add a empty node to args.children
    if (!args.children.length) {
      // Handle empty arguments
      args.addChild(new nodes.Literal(0, 0, ''))
    }
    parser.advanceAfterBlockEnd(tok.value)
    const body = parser.parseUntilBlocks('endPostPrev') // eng tag
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtensionAsync(this, 'run', args, [body]) // async
  }
  this.run = async function (context, args, body, callback) {
    const postService = app.get(PostService)
    // type: tag category  year month
    if (args.id) {
      context.ctx.post = await postService.getPrevPostByPostId(args.id)
      const result = new nunjucks.runtime.SafeString(body())
      return callback(null, result)
    } else {
      const result = new nunjucks.runtime.SafeString('')
      return callback(null, result)
    }
  }
}

export function PostNext(app: NestExpressApplication): void {
  // tag with endpoint test
  this.tags = ['PostNext']
  this.parse = function (parser, nodes) {
    const tok = parser.nextToken()
    const args = parser.parseSignature(null, true)
    // !nunjucks has a bug, when args.children is empty
    // add a empty node to args.children
    if (!args.children.length) {
      // Handle empty arguments
      args.addChild(new nodes.Literal(0, 0, ''))
    }
    parser.advanceAfterBlockEnd(tok.value)
    const body = parser.parseUntilBlocks('endPostNext') // eng tag
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtensionAsync(this, 'run', args, [body]) // async
  }
  this.run = async function (context, args, body, callback) {
    const postService = app.get(PostService)
    // type: tag category  year month
    if (args.id) {
      context.ctx.post = await postService.getNextPostByPostId(args.id)
      const result = new nunjucks.runtime.SafeString(body())
      return callback(null, result)
    } else {
      const result = new nunjucks.runtime.SafeString('')
      return callback(null, result)
    }
  }
}
