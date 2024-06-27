import { camelCase, mapKeys, snakeCase } from 'lodash'

export default class Utils {
  // 转换成驼峰
  static convertToCamel(attrs) {
    return mapKeys(attrs, (_value, key) => camelCase(key))
  }
  // 转换成非驼峰

  static convertToSnakeCase(attrs) {
    return mapKeys(attrs, (_value, key) => snakeCase(key))
  }
}
