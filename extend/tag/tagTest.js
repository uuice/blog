"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = exports.name = void 0;
exports.name = 'TagTestUser';
const uuice_cli_1 = require("uuice-cli");
uuice_cli_1.nunjucks.configure({ autoescape: false });
function command(app) {
    this.tags = [`${exports.name}`];
    this.parse = function (parser, nodes) {
        const tok = parser.nextToken();
        const args = parser.parseSignature(null, true);
        if (!args.children.length) {
            args.addChild(new nodes.Literal(0, 0, ''));
        }
        parser.advanceAfterBlockEnd(tok.value);
        const body = parser.parseUntilBlocks(`end${exports.name}`);
        parser.advanceAfterBlockEnd();
        return new nodes.CallExtensionAsync(this, 'run', args, [body]);
    };
    this.run = function (context, args, body, callback) {
        return __awaiter(this, void 0, void 0, function* () {
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
            ];
            const result = new uuice_cli_1.nunjucks.runtime.SafeString(body());
            return callback(null, result);
        });
    };
}
exports.command = command;
//# sourceMappingURL=tagTest.js.map