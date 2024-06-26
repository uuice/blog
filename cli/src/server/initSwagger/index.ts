import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ApiModule } from '../api/api.module'

export function initSwagger(app: NestExpressApplication) {
  const apiConfig = new DocumentBuilder()
    .setTitle('Api')
    .setDescription('The API description')
    .setVersion('1.0.0')
    .addTag('api')
    .build()

  const apiDocument = SwaggerModule.createDocument(app, apiConfig, {
    include: [ApiModule]
  })
  SwaggerModule.setup('doc/api', app, apiDocument)
}
