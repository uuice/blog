import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { CWD, ConfigService, DB_PATH } from './core/service/config.service'
import { DbService } from './core/service/db.service'
import { PostService } from './core/service/post.service'

export async function bootstrap (options: {
  port: number
  cwd: string,
  dbPath: string,
}) {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  await app.listen(options.port)

  const configService = app.get(ConfigService)
  configService.setItem(CWD, options.cwd)
  configService.setItem(DB_PATH, options.dbPath)

  console.log(configService.getItem(CWD))
  console.log(configService.getItem(DB_PATH))

  const dbService = app.get(DbService)

  dbService.initDb()
  const testService = app.get(PostService)
  console.log(testService.getArchivesByDate())
}
