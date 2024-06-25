export class ViewData {
  private readonly viewData = {}
  constructor () {
    this.viewData = {}
  }

  /**
   *
   * @param name
   * @param value
   */
  assign (name?: string | undefined | object, value?: object | string | number | undefined) {
    if (name === undefined) {
      return this.viewData
    } else if (value === undefined) {
      if (typeof name === 'string') {
        return this.viewData[name]
      } else {
        for (const key in name) {
          this.viewData[key] = name[key]
        }
      }
    } else {
      if (typeof name === 'string') {
        this.viewData[name] = value
      }
    }
  }
}
