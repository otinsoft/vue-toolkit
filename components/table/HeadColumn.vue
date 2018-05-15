<template>
  <th :width="width" :class="{ 'cursor-pointer': orderable || filters }" class="select-none"
      @click="onClick">
    <div v-if="type === 'selection'" class="d-flex">
      <checkbox class="m-0"/>
    </div>
    <template v-else>
      <span :class="{
        'text-primary': filterValues.length > 0
      }">{{ label }}</span>

      <span v-if="orderable" class="order-icon d-inline-block ml-1">
        <fa v-if="orderDirection === 'asc'" icon="sort-up" pack="fas"/>
        <fa v-else-if="orderDirection === 'desc'" icon="sort-down" pack="fas"/>
        <fa v-else icon="sort" pack="fas"/>
      </span>
      <span v-else-if="filters" class="filter-icon d-inline-block ml-1">
        <fa icon="chevron-down"/>
      </span>

      <filter-panel v-if="filters"
                    ref="filterpanel"
                    :filters="filters"
                    v-model="filterValues"/>
    </template>
  </th>
</template>

<script>
import TableColumn from './Column'
import FilterPanel from './FilterPanel'

export default {
  components: {
    FilterPanel
  },

  extends: TableColumn,

  data: () => ({
    filterValues: [],
    orderDirection: null
  }),

  watch: {
    filterValues (values) {
      this.$emit('filter', this.prop, values)
    }
  },

  methods: {
    onClick (e) {
      if (this.orderable) {
        this.$emit('order', this)
      } else if (this.filters) {
        e.stopPropagation()
        this.$refs.filterpanel.show()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order-icon {
  font-size: .875rem;
}

.fa-sort {
  opacity: .4;
}

.fa-sort-up {
  margin-bottom: -2px;
}

.fa-sort-down {
  vertical-align: 0;
}

.filter-icon  {
  font-size: .625rem;
}

.fa-chevron-down {
  vertical-align: 0;
}
</style>
