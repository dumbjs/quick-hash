export function sdbm(toHash: string): string {
  let hash = BigInt(0)
  let c

  for (let i = toHash.length - 1; i > 0; i--) {
    c = BigInt(toHash.charCodeAt(i))
    hash = hash * BigInt(65599) + c
  }

  return '' + hash
}

export function sdbmGawk(toHash: string): string {
  let hash = BigInt(0)

  for (let i = 0; i < toHash.length; i++)
    hash = BigInt(toHash.charCodeAt(i)) + (hash << 6n) + (hash << 16n) - hash

  return '' + hash
}
