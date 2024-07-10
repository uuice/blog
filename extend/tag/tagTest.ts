export const name = 'TagTestUser';
import { NestExpressApplication, CustomTagOptions } from 'uuice-cli'
export function command(app: NestExpressApplication, options: CustomTagOptions): void {
  // tag with endpoint test
  this.tags = [`${name}`]
  this.parse = function (parser: any, nodes: any) {
    const tok = parser.nextToken()
    const args = parser.parseSignature(null, true)
    // !nunjucks has a bug, when args.children is empty
    // add an empty node to args.children
    if (!args.children.length) {
      // Handle empty arguments
      args.addChild(new nodes.Literal(0, 0, ''))
    }
    parser.advanceAfterBlockEnd(tok.value)
    const body = parser.parseUntilBlocks(`end${name}`) // eng tag
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtensionAsync(this, 'run', args, [body]) // async
  }
  this.run = async function (context: any, args: any, body: any, callback: any) {
    // !I don't know why app.get(SysConfigService) doesn't work, return undefined
    // ! you can use `new SysConfigService` by yourself
    // const configService = new ConfigService()
    // const dbService = new DbService(configService)
    // await dbService.initDb()
    // const sysConfigService: SysConfigService = new SysConfigService(dbService)
    // console.log(sysConfigService.getSysConfig())
    console.log(options.sysConfigService.getSysConfig())
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
    // const result = new nunjucks.runtime.SafeString(body())
    // !I don't know why the new nunjucks.runtime.SafeString return HTML does not work
    // ! so use env instance and get safe method
    const result = options.env.getFilter('safe')(body())
    return callback(null, result)
  }
}
