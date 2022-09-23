export function updateObjInArr<T, P>(arr: T[], idLabel: keyof T, replaceId: number, newData: P) {
  return arr.map((element) => {
    if (+element[idLabel] === replaceId) return { ...element, ...newData }
    return element
  })
}

export function getKeyByValue<O extends Object, V>(object: O, value: V) {
  return Object.keys(object).find((key) => object[key as keyof O] === value)
}
