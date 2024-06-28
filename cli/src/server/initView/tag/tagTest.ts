import * as nunjucks from 'nunjucks'
import { NestExpressApplication } from '@nestjs/platform-express'

export function TagTest(app: NestExpressApplication): void {
  // tag with endpoint test
  this.tags = ['TagTest']
  this.parse = function (parser, nodes) {
    const tok = parser.nextToken()
    const args = parser.parseSignature(null, true)
    parser.advanceAfterBlockEnd(tok.value)
    const body = parser.parseUntilBlocks('endTagTest') // eng tag
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtensionAsync(this, 'run', args, [body]) // async
  }
  this.run = async function (context, args, body, callback) {
    console.log(args)
    // const configLocalService = app.get(ConfigLocalService)
    // console.log(configLocalService.getKnexConfig())
    // const userService = app.get(UserService)
    // console.log(userService)
    context.ctx.list = [
      {
        id: 1,
        city: '北京',
        parent: 0,
        spelling: 'BeiJing',
        abbr: 'BJ',
        short: 'B'
      },
      {
        id: 2,
        city: '上海',
        parent: 0,
        spelling: 'ShangHai',
        abbr: 'SH',
        short: 'S'
      },
      {
        id: 3,
        city: '天津',
        parent: 0,
        spelling: 'TianJin',
        abbr: 'TJ',
        short: 'T'
      },
      {
        id: 4,
        city: '重庆',
        parent: 0,
        spelling: 'ZhongQing',
        abbr: 'ZQ',
        short: 'Z'
      },
      {
        id: 5,
        city: '黑龙江',
        parent: 0,
        spelling: 'HeiLongJiang',
        abbr: 'HLJ',
        short: 'H'
      }
    ] // return
    const result = new nunjucks.runtime.SafeString(body())
    return callback(null, result)
  }
}
