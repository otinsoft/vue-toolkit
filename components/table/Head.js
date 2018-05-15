import HeadColumn from './HeadColumn'

export default {
  name: 'TableHead',

  props: {
    columns: {
      type: Array,
      required: true
    }
  },

  render (createElement) {
    const createColumn = column => {
      return createElement(HeadColumn, {
        props: { ...column.componentOptions.propsData },
        on: {
          order: (...args) => this.$emit('order', ...args),
          filter: (...args) => this.$emit('filter', ...args)
        }
      })
    }

    return createElement(
      'thead',
      [createElement('tr', this.columns.map(createColumn))]
    )
  }
}
