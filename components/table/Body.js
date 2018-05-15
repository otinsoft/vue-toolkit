import BodyColumn from './BodyColumn'

export default {
  name: 'TableBody',

  props: {
    data: {
      type: Array,
      required: true
    },

    columns: {
      type: Array,
      required: true
    }
  },

  render (createElement) {
    const createColumn = (item, column) => {
      return createElement(BodyColumn, {
        scopedSlots: column.data.scopedSlots || {},
        props: { ...column.componentOptions.propsData, item }
      })
    }

    const rows = this.data.map(item => createElement(
      'tr',
      this.columns.map(column => createColumn(item, column))
    ))

    if (rows.length === 0) {
      rows.push(createElement('tr', [createElement('td', {
        class: { 'text-center': true },
        attrs: { colspan: this.columns.length }
      }, 'No entires found.')]))
    }

    return createElement('tbody', rows)
  }
}
