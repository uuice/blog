import { camelCase, mapKeys, snakeCase } from 'lodash'

export default class Utils {
  static convertToCamel(attrs) {
    return mapKeys(attrs, (_value, key) => camelCase(key))
  }

  static convertToSnakeCase(attrs) {
    return mapKeys(attrs, (_value, key) => snakeCase(key))
  }
}
