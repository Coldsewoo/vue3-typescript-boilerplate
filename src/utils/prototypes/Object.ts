export {}

if (!Object.prototype.omap) {
  Object.defineProperty(Object.prototype, 'omap', {
    value: function (callback, thisArg) {
      let T, O, R
      if (this == null) {
        throw new TypeError(' this is null or not defined')
      }
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function')
      }

      if (arguments.length > 1) {
        T = thisArg
      }

      O = Object(this)
      R = Object({})
      const keys = Object.keys(O)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const value = O[key]
        const mappedValue = callback.call(T, key, value, i, O)
        R[key] = mappedValue
      }
      return R
    },
    writable: true,
    configurable: true,
    enumerable: false,
  })
}

if (!Object.prototype.ofilter) {
  Object.defineProperty(Object.prototype, 'ofilter', {
    value: function (predicate, thisArg) {
      let T, O, R

      if (this == null) {
        throw new TypeError(' this is null or not defined')
      }

      if (typeof predicate !== 'function') {
        throw new TypeError(predicate + ' is not a function')
      }

      if (arguments.length > 1) {
        T = thisArg
      }

      O = Object(this)
      R = Object({})
      const keys = Object.keys(O)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const value = O[key]
        const check = predicate.call(T, key, value, i, O)
        if (check) {
          R[key] = value
        }
      }
      return R
    },
    writable: true,
    configurable: true,
    enumerable: false,
  })
}

if (!Object.prototype.oreduce) {
  Object.defineProperty(Object.prototype, 'oreduce', {
    value: function (callback, initialValue) {
      let value, O
      if (this == null) {
        throw new TypeError(' this is null or not defined')
      }

      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function')
      }

      O = Object(this)
      const keys = Object.keys(O)
      const len = keys.length
      let k = 0
      if (initialValue) {
        value = initialValue
      } else {
        while (k < len && !(keys[k] in O)) {
          k++
        }
        if (k >= len) {
          throw new TypeError(
            'Reduce of empty array ' + 'with no initial value'
          )
        }
        value = O[keys[k++]]
      }

      while (k < len) {
        const key = keys[k]
        value = callback(value, O[key], key, k, O)
        k++
      }
      return value
    },
    writable: true,
    configurable: true,
    enumerable: false,
  })
}
