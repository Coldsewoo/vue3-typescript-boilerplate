export const Base64Binary = {
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

  /* will return a  Uint8Array type */
  decodeArrayBuffer: function (input: string): ArrayBuffer {
    const bytes = (input.length / 4) * 3
    let ab = new ArrayBuffer(bytes)
    this.decode(input, ab)

    return ab
  },

  removePaddingChars: function (input: string): string {
    const lkey = this._keyStr.indexOf(input.charAt(input.length - 1))
    if (lkey == 64) {
      return input.substring(0, input.length - 1)
    }
    return input
  },

  decode: function (input: string, arrayBuffer: ArrayBuffer): Uint8Array {
    //get last chars to see if are valid
    input = this.removePaddingChars(input)
    input = this.removePaddingChars(input)

    let bytes = parseInt(`${(input.length / 4) * 3}`, 10)

    let uarray
    let chr1, chr2, chr3
    let enc1, enc2, enc3, enc4
    let i = 0
    let j = 0

    if (arrayBuffer) uarray = new Uint8Array(arrayBuffer)
    else uarray = new Uint8Array(bytes)

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')

    for (i = 0; i < bytes; i += 3) {
      //get the 3 octects in 4 ascii chars
      enc1 = this._keyStr.indexOf(input.charAt(j++))
      enc2 = this._keyStr.indexOf(input.charAt(j++))
      enc3 = this._keyStr.indexOf(input.charAt(j++))
      enc4 = this._keyStr.indexOf(input.charAt(j++))

      chr1 = (enc1 << 2) | (enc2 >> 4)
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
      chr3 = ((enc3 & 3) << 6) | enc4

      uarray[i] = chr1
      if (enc3 != 64) uarray[i + 1] = chr2
      if (enc4 != 64) uarray[i + 2] = chr3
    }

    return uarray
  },
}

export const hexToRgba = function (hexCode: string, alpha = 1): string {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const hex = hexCode.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
        result[3],
        16
      )},${alpha})`
    : 'rgba(0,0,0,1)'
}

export const rgbaToHex = function (rgba: string): string {
  const rgbRegex = /rgba?\((\d+),(\d+),(\d+),.*\)/
  const result = rgbRegex.exec(rgba)
  if (result != null) {
    const [full, r, g, b] = result
    return '#' + ((1 << 24) + (+r << 16) + (+g << 8) + +b).toString(16).slice(1)
  }

  return '#000000'
}

export const pad = function (v: string | number, offset: number): string {
  return ('0'.repeat(offset) + '' + ('' + v)).slice(-offset)
}

export const sleep = (t: number): Promise<void> => {
  return new Promise((r, j) => {
    setTimeout(() => {
      r()
    }, t)
  })
}

export const getValue = (v: string | number) => {
  return +('' + v).replace(/[^0-9\.]/g, '')
}

export const getComma = function (v: string | number, group = 3): string {
  const rstr = `\\B(?=(\\d{${group}})+(?!\\d))` // ?
  const checkRegex = new RegExp(rstr, 'g')
  if (!isNaN(+v)) {
    const number = '' + v
    if (number.includes('.')) {
      const spliited = number.split('.')
      return `${spliited[0].replace(checkRegex, ',')}.${spliited[1]}`
    }
    return number.replace(checkRegex, ',')
  }
  return '' + v
}

export function objectMap(object: Object, mapFunc: (key: any) => any): Object {
  return Object.keys(object).reduce((obj, key) => {
    obj[key] = mapFunc(key)
    return obj
  }, {})
}

export function objectReduce(
  object: Object,
  reduceFunc: (
    accumulator: any,
    key: string,
    index?: number,
    Array?: Array<any>
  ) => any,
  initial?: any
): any {
  return Object.keys(object).reduce(reduceFunc, initial)
}

export function SetProperty(
  object: Record<string, unknown>,
  property: string,
  value: unknown
): void {
  const Property = Object.getOwnPropertyDescriptor(
    object,
    property
  ) as PropertyDescriptor

  Property.value = value
  Property.configurable = true
  Property.writable = true

  Object.defineProperty(object, property, Property)
}

export function swap(arr: any[], idx1: number, idx2: number): void {
  ;[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}

export function findClosest(arr, number) {
  const target = number - 8
  return arr.reduce((prev, curr) =>
    Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
  )
}

export function findClosestSmall(arr, number) {
  const target = number + 8
  return arr.reduce((prev, curr) => {
    if (curr > target) return prev
    return Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
  }, 0)
}

export function getUnitAngle(vector) {
  const [yVec_x, yVec_y] = vector.coordinates
  const size = Math.sqrt(yVec_x ** 2 + yVec_y ** 2)
  const angle = Math.acos(yVec_y / size)
  return yVec_x < 0 ? angle : -angle
}

export function pointIsInPoly(p, polygon) {
  let isInside = false
  const mapX = polygon.map((p) => p[0])
  const mapY = polygon.map((p) => p[1])
  const px = p[0]
  const py = p[1]
  const minX = Math.min(...mapX)
  const maxX = Math.max(...mapX)
  const minY = Math.min(...mapY)
  const maxY = Math.max(...mapY)
  if (px < minX || px > maxX || py < minY || py > maxY) {
    return false
  }
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    if (
      polygon[i][1] > py != polygon[j][1] > py &&
      px <
        ((polygon[j][0] - polygon[i][0]) * (py - polygon[i][1])) /
          (polygon[j][1] - polygon[i][1]) +
          polygon[i][0]
    ) {
      isInside = !isInside
    }
  }
  return isInside
}
