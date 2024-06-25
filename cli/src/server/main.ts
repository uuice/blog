import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'

export async function bootstrap (port: number = 3000) {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  await app.listen(port)
}
