import { TagService } from '../../core/service/tag.service'
import * as nunjucks from 'nunjucks'
import { NestExpressApplication } from '@nestjs/platform-express'

export function TagList(app: NestExpressApplication): void {
  // tag with endpoint test
  this.tags = ['TagList']
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
    const body = parser.parseUntilBlocks('endTagList') // eng tag
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtensionAsync(this, 'run', args, [body]) // async
  }
  this.run = async function (context, args, body, callback) {
    const tagService = app.get(TagService)
    if (args.withPostNum) {
      context.ctx.list = await tagService.getTagListWidthPostNum()
    } else {
      context.ctx.list = await tagService.getTagList()
    }
    const result = new nunjucks.runtime.SafeString(body())
    return callback(null, result)
  }
}

export function TagItem(app: NestExpressApplication): void {
  // tag with endpoint test
  this.tags = ['TagItem']
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
    const body = parser.parseUntilBlocks('endTagItem') // eng tag
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtensionAsync(this, 'run', args, [body]) // async
  }
  this.run = async function (context, args, body, callback) {
    if (args.id) {
      const tagService = app.get(TagService)
      context.ctx.tag = await tagService.getTagById(args.id)
      const result = new nunjucks.runtime.SafeString(body())
      return callback(null, result)
    } else if (args.title) {
      const tagService = app.get(TagService)
      context.ctx.tag = await tagService.getTagByTitle(args.title)
      const result = new nunjucks.runtime.SafeString(body())
      return callback(null, result)
    } else if (args.url) {
      const tagService = app.get(TagService)
      context.ctx.tag = await tagService.getTagByUrl(args.url)
      const result = new nunjucks.runtime.SafeString(body())
      return callback(null, result)
    } else {
      const result = new nunjucks.runtime.SafeString('')
      return callback(null, result)
    }
  }
}
