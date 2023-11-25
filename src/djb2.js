/**
 * @param {string} toHash
 * @return {string}
 */
export const djb2 = function djb2(toHash) {
  let hash = 5381
  let c

  for (let i = 0; i < toHash.length; i++) {
    c = toHash.charCodeAt(i)
    hash = (hash << 5) + hash + c
  }

  return '' + hash
}
