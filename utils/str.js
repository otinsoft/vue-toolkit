/**
 * Generate a "random" alpha-numeric string.
 *
 * @param  {Number} length
 * @return {String}
 */
export function quickRandom (length = 16) {
  const pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const poolLen = pool.length

  return [...Array(length)].map(() => pool.charAt(Math.floor(Math.random() * poolLen))).join('')
}
