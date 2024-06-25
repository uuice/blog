import { Module } from '@nestjs/common'
import { TestModule } from './test/test.module'
import { CoreModule } from './core/core.module'

@Module({
  imports: [TestModule, CoreModule]
})
export class AppModule {}
