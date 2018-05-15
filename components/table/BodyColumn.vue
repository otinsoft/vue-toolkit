<template>
  <td>
    <div v-if="type === 'selection'" class="d-flex">
      <checkbox class="m-0"/>
    </div>
    <template v-else>
      <slot v-if="$scopedSlots.default" :row="item"/>
      <template v-else>{{ value }}</template>
    </template>
  </td>
</template>

<script>
import { get } from 'lodash-es'
import TableColumn from './Column'

export default {
  extends: TableColumn,

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    /**
     * @return {Any}
     */
    value () {
      const value = get(this.item, this.prop)

      if (typeof this.filter === 'function') {
        return this.filter(value)
      }

      if (typeof this.filter === 'string') {
        return this.$options.filters[this.filter](value)
      }

      if (Array.isArray(this.filter)) {
        const [filter, ...args] = this.filter
        return this.$options.filters[filter](value, ...args)
      }

      return value
    }
  }
}
</script>
