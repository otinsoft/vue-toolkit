import TableHead from './Head'
import TableBody from './Body'

export default {
  name: 'VTable',

  props: {
    data: {
      type: Array,
      required: true
    },

    hover: Boolean,
    striped: Boolean,
    bordered: Boolean
  },

  computed: {
    /**
     * Get the table column components.
     *
     * @return {Array<VNode>}
     */
    columns () {
      return this.$slots.default.filter(VNode =>
        VNode.componentOptions.tag === 'table-column'
      )
    },

    /**
     * Get the searchable column props.
     *
     * @return {Array<String>}
     */
    searchableColumns () {
      return this.columns.filter(VNode =>
        VNode.componentOptions.propsData.searchable !== undefined &&
        VNode.componentOptions.propsData.prop
      ).map(VNode => VNode.componentOptions.propsData.prop)
    }
  },

  render (createElement) {
    return createElement(
      'table',
      {
        class: {
          table: true,
          'table-hover': this.hover,
          'table-striped': this.striped,
          'table-bordered': this.bordered
        }
      },
      [
        // <thead>
        createElement(
          TableHead,
          {
            ref: 'head',
            props: { columns: this.columns },
            on: {
              order: (...args) => this.$emit('order', ...args),
              filter: (...args) => this.$emit('filter', ...args)
            }
          }
        ),

        // <tbody>
        createElement(
          TableBody,
          { props: { columns: this.columns, data: this.data } }
        )
      ]
    )
  },

  methods: {
    /**
     * @param {String} column
     * @param {String} direction
     */
    setOrdering (column, direction) {
      this.$refs.head.$children.forEach(columnComponent => {
        columnComponent.orderDirection = null

        if (columnComponent.prop === column) {
          columnComponent.orderDirection = direction
        }
      })
    }
  }
}
