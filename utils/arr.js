/**
 * Find an item in the collection.
 *
 * @param  {Array}  items
 * @param  {Any}    item
 * @param  {String} prop
 * @return {Any}
 */
export function findItem (items, item, prop = 'id') {
  const val = typeof item === 'object' ? item[prop] : item

  return items.find(item => item[prop] === val)
}

/**
 * Remove an item from the collection.
 *
 * @param {Array} items
 * @param {Object|Number} item
 */
export function removeItem (items, item) {
  const id = typeof item === 'object' ? item.id : item

  const index = items.findIndex(i => i.id === id)

  if (index > -1) {
    items.splice(index, 1)
  }
}

/**
 * Update an item's attributes in the collection.
 *
 * @param {Array} items
 * @param {Object} item
 */
export function updateItem (items, item) {
  const old = items.find(i => i.id === item.id)

  if (old) {
    Object.keys(item).forEach(key => {
      old[key] = item[key]
    })
  }
}

/**
 * Split the given array into chunks.

 * @param  {Array} array
 * @param  {Number} size
 * @return {Array}
 */
export function arrayChunk (array, size) {
  return array.reduce((a, b, i, g) => !(i % size) ? a.concat([g.slice(i, i + size)]) : a, [])
}

/**
 * Paginate the given array.
 *
 * @param  {Array} array
 * @param  {Number} page
 * @param  {Number} perPage
 * @return {Array}
 */
export function paginate (array, page, perPage = 15) {
  if (array.length <= perPage) {
    return array
  }

  return arrayChunk(array, perPage)[page - 1]
}
