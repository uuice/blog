import * as nunjucks from 'nunjucks'
import { NestExpressApplication } from '@nestjs/platform-express'
// import { ConfigLocalService } from '@core/service/config-local/config-local.service'
// import { UserService } from '@core/service/db/user/user.service'
import { Logger } from '@nestjs/common'

export function TagTest2(app: NestExpressApplication): void {
  console.log(app)
  // tag标签测试
  this.tags = ['TagTest2']
  this.parse = function (parser, nodes) {
    const tok = parser.nextToken()
    const args = parser.parseSignature(null, true)
    parser.advanceAfterBlockEnd(tok.value)
    // const body = parser.parseUntilBlocks('endTagTest2') // eng tag
    // parser.advanceAfterBlockEnd()
    return new nodes.CallExtensionAsync(this, 'run', args) // async
  }
  this.run = async function (context, args, callback) {
    const logger = new Logger('TagTest2')
    logger.error('test')
    logger.warn('test')
    logger.debug('debug', {
      a: 'a'
    })
    console.log(args, /args/)
    console.log(callback, /callback/)
    const result = new nunjucks.runtime.SafeString('TagTest2')
    return callback(null, result)
  }
}
