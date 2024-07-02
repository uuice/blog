import Color from 'colorjs.io'

export const getColor = (l, c, h) => {
  return getColorNode(l, c, h)
}

function getColorNode(l, c, h) {
  return new Color('oklch', [l, c, h]).to('srgb').toString({ format: 'hex' })
}
