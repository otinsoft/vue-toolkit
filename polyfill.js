const polyfill = {
  cdn: 'https://cdn.polyfill.io/v2/polyfill.min.js?features=',

  features: [
    'Promise',
    'Object.assign',
    'Object.values',
    'Array.prototype.find',
    'Array.prototype.findIndex',
    'Array.prototype.includes',
    'String.prototype.includes',
    'String.prototype.startsWith',
    'String.prototype.endsWith'
  ],

  /**
   * @param {...String|Array} features
   */
  add (...features) {
    if (Array.isArray(features[0])) {
      features = features[0]
    }

    this.features.push(...features)
  },

  /**
   * @return {String}
   */
  toUrl () {
    return this.cdn + this.features.join(',')
  }
}

module.exports = polyfill
