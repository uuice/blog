import { PageService } from './../core/service/page.service'
import { Module, DynamicModule, OnModuleInit } from '@nestjs/common'
import { RouterModule, Routes } from '@nestjs/core'
import { PageController } from './controller/page.controller'
import { CoreModule } from '../core/core.module'

interface DynamicRouteOptions {
  path: string
  method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'update'
  controller: any
  endpoint: string
}

@Module({
  imports: [CoreModule],
  controllers: [PageController],
  exports: []
})
export class DynamicRoutesModule implements OnModuleInit {
  constructor(private pageService: PageService) {}
  onModuleInit() {
    const pageList = this.pageService.getPageList()
    const dynamicRoutes: DynamicRouteOptions[] = []
    pageList.forEach((page) => {
      dynamicRoutes.push({
        path: `/${page.alias}`,
        controller: PageController,
        method: 'get',
        endpoint: 'index'
      })
    })

    return this.registerDynamicRoutes(dynamicRoutes)
  }

  private registerDynamicRoutes(routes: DynamicRouteOptions[]): DynamicModule {
    const dynamicRoutes: Routes = routes.map((route) => ({
      path: route.path,
      method: route.method,
      controller: route.controller,
      action: route.endpoint
    }))

    // return RouterModule.register(dynamicRoutes)
    return {
      module: DynamicRoutesModule,
      imports: [RouterModule.register(dynamicRoutes)]
    }
  }
}
