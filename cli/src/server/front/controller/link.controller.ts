import { Controller, Get, Render } from '@nestjs/common'
import { ViewData, mixedDataView } from '../../core/helper/viewData'
import { SysConfigService } from '../../core/service/sysConfig.service'
import { JsonService } from '../../core/service/json.service'

@Controller('links')
export class LinkController {
  constructor(
    private readonly sysConfigService: SysConfigService,
    private readonly jsonService: JsonService
  ) {}

  @Get('')
  @Render('link')
  index() {
    const viewData = new ViewData()
    viewData.assign('pageType', 'Link')
    viewData.assign('sysConfig', this.sysConfigService.getSysConfig())
    const linkList = this.jsonService.getJsonByAlias('link')
    const linkArchive = []
    linkList.forEach((list) => {
      const index = linkArchive.findIndex((obj) => list.type in obj)
      if (index < 0) {
        // year doesn't exist
        const obj = {
          [list.type]: [list]
        }
        linkArchive.push(obj)
      } else {
        linkArchive[index][list.type].push(list)
      }
    })
    viewData.assign('linkArchive', linkArchive)
    return mixedDataView(viewData).assign()
  }
}
