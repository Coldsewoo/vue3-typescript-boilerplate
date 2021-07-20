declare interface Object {
  /**
   * Calls a defined callback function on each element of an array, and returns an array that contains the results.
   * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  omap(
    callbackfn: (
      key: string,
      value: T,
      index: number,
      object: readonly Record<string, T>
    ) => U,
    thisArg?: Record<string, any>
  ): Record<string, U>
  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
   */
  ofilter(
    predicate: (
      key: string,
      value: T,
      index: number,
      object: readonly Record<string, T>
    ) => boolean,
    thisArg?: any
  ): Record<string, T>
  /**
   * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
   * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
   */
  oreduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentKey: string,
      currentIndex: number,
      array: readonly Record<string, T>
    ) => T,
    initialValue?: T
  ): U
}
