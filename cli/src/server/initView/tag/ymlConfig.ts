import * as nunjucks from 'nunjucks'
import { NestExpressApplication } from '@nestjs/platform-express'
import { YmlService } from '../../core/service/yml.service'

export function YmlConfig(app: NestExpressApplication): void {
  // tag with endpoint test
  this.tags = ['YmlConfig']
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
    const body = parser.parseUntilBlocks('endYmlConfig') // eng tag
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtensionAsync(this, 'run', args, [body]) // async
  }
  this.run = async function (context, args, body, callback) {
    const ymlService = app.get(YmlService)
    if (args.alias) {
      context.ctx.ymlData = await ymlService.getYmlByAlias(args.alias)
      const result = new nunjucks.runtime.SafeString(body())
      return callback(null, result)
    } else {
      const result = new nunjucks.runtime.SafeString('')
      return callback(null, result)
    }
  }
}
