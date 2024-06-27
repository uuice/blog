import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'
import { ConfigService, CWD, DB_PATH } from './core/service/config.service'
import { DbService } from './core/service/db.service'
import { initSwagger } from './initSwagger'

export async function bootstrap(options: { port: number; cwd: string; dbPath: string }) {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn'],
    bufferLogs: true
  })

  app.set('trust proxy', 1)
  app.use(
    helmet({
      contentSecurityPolicy: {
        // useDefaults: false,
        // prettier-ignore
        directives: {
          // 'default-src': ['\'self\''],
          // 'base-uri': ['\'self\''],
          // 'block-all-mixed-content': [],
          // 'font-src': ['\'self\'', 'https:', 'data:'],
          // 'form-action': ['\'self\''],
          // 'frame-ancestors': ['\'self\''],
          // 'img-src': ['\'self\'', 'data:'],
          // 'object-src':  ['\'none\''],
          // 'script-src': ['\'self\'', '\'unsafe-inline\''],
          // 'script-src-attr': ['\'none\''],
          // 'worker-src': ['self', 'blob:'],
          // 'style-src': ['\'self\'', 'https:', '\'unsafe-inline\''],
          // 'upgrade-insecure-request': null,

          scriptSrc: ['\'self\'', '\'unsafe-inline\''],
          workerSrc: ['self', 'blob:'],
          upgradeInsecureRequests: null
        }
      }
    })
  )

  app.enableCors()
  initSwagger(app)
  // Set the base variable and initialize db
  const configService = app.get(ConfigService)
  configService.setItem(CWD, options.cwd)
  configService.setItem(DB_PATH, options.dbPath)
  const dbService = app.get(DbService)
  dbService.initDb()

  // TODO：Initialize flexsearch,  the Next-Generation full text search library
  await app.listen(options.port)
}
