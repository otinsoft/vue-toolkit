import Checkbox from './../Checkbox'

export default {
  name: 'TableColumn',

  components: {
    Checkbox
  },

  props: {
    type: {
      type: String,
      default: 'value',
      validator: value => ['value', 'selection'].includes(value)
    },

    prop: String,
    label: String,
    filters: Array,
    orderable: Boolean,
    searchable: Boolean,
    width: [Number, String],
    filter: [String, Array, Function]
  }
}
