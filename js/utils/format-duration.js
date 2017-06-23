/**
 * Format duration.
 *
 * @param  {Number} seconds
 * @return {String}
 */
export default time => {
  let minutes = Math.floor(time / 60)
  let seconds = time - (minutes * 60)

  if (minutes < 10) minutes = `0${minutes}`
  if (seconds < 10) seconds = `0${seconds}`

  return `${minutes}:${seconds}`
}
