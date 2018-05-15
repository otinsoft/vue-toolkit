<template>
  <div v-loading="loading" class="data-grid">
    <slot name="header">
      <div v-if="searchable" class="row mb-2">
        <div class="col-sm-6 mb-2 mb-sm-0">
          <slot name="header-left"/>
        </div>
        <div class="col-sm-6">
          <search class="float-right w-100" @search="handleSearch"/>
        </div>
      </div>
    </slot>

    <slot :data="data" name="content">
      <div class="table-responsive">
        <v-table ref="table" :data="data" v-bind="tableProps" @order="handleOrder" @filter="handleFilter">
          <slot/>
        </v-table>
      </div>
    </slot>

    <pagination v-if="pagination" :pagination="pagination" @change="onPageChanged"/>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import VTable from '../table/Table'
import { removeItem } from '~/utils'
import Search from './DataGridSearch'
import Pagination from './DataGridPagination'

export default {
  name: 'DataGrid',

  components: {
    VTable,
    Search,
    Pagination
  },

  props: {
    url: {
      type: String,
      required: true
    },

    initialData: {
      type: Object,
      default: null
    },

    defaultOrder: {
      type: [String, Array],
      default: null
    },

    tableProps: {
      type: Object,
      default: () => ({
        hover: true,
        striped: true
      })
    },

    paramsSerializer: {
      type: Function,
      default: params => $.param(params)
    }
  },

  data: () => ({
    data: [],
    pagination: null,
    loading: false,
    orders: [],
    filters: [],
    searchableColumns: []
  }),

  computed: {
    /**
     * @return {Number}
     */
    page () { return this.pagination ? this.pagination.current_page : 1 },

    /**
     * @return {Boolean}
     */
    searchable () { return this.searchableColumns.length > 0 }
  },

  async mounted () {
    if (this.initialData) {
      const { data, ...pagination } = this.initialData

      this.data = data
      this.pagination = pagination
    } else {
      await this.fetch()
    }

    if (this.defaultOrder) {
      if (typeof this.defaultOrder === 'string') {
        this.setTableOrdering(this.defaultOrder)
      } else {
        const [column, direction] = this.defaultOrder
        this.setTableOrdering(column, direction)
      }
    }

    if (this.$refs.table) {
      this.searchableColumns = this.$refs.table.searchableColumns
    }
  },

  methods: {
    /**
     * @param {Object} params
     */
    async fetch (params = {}) {
      this.startLoading()

      params = {
        page: this.page,
        orders: this.orders,
        filters: this.filters,
        ...params
      }

      const response = await axios.get(this.url, {
        params,
        paramsSerializer: this.paramsSerializer
      })

      const { data, ...pagination } = response.data

      if (data.length === 0 && pagination.total > 0 && params.page !== 1) {
        return this.fetch({ page: params.page - 1 })
      }

      this.data = data
      this.pagination = pagination

      this.stopLoading()
    },

    /**
     * @param {String} colum
     * @param {String} direction
     */
    orderBy (column, direction = 'asc') {
      this.orders = [{ column, direction }]
      this.fetch()
    },

    /**
     * @param {String} value
     * @param {String|Array} columns
     */
    search (value, columns) {
      if (value.length !== 0 && value.length < 2) {
        return
      }

      if (!Array.isArray(columns)) {
        columns = [columns]
      }

      this.filters = [{ value, property: columns }]
      this.fetch({ page: 1 })
    },

    /**
     * @param {Object|Number} item
     */
    removeItem (item) { removeItem(this.data, item) },

    startLoading () { this.loading = true },

    stopLoading () { this.loading = false },

    /**
     * @param {Number} page
     */
    onPageChanged (page) { this.fetch({ page }) },

    /**
     * @param {String} value
     */
    handleSearch (value) { this.search(value, this.searchableColumns) },

    /**
     * @param {VueComponent} column
     */
    handleOrder (column) {
      const direction = column.orderDirection === 'asc' ? 'desc' : 'asc'

      this.setTableOrdering(column.prop, direction)

      this.orderBy(column.prop, direction)
    },

    handleFilter (prop, values) {
      const filter = { value: values, property: prop, operator: 'in' }

      const oldFilter = this.filters.find(f => f.property === prop)

      if (oldFilter) {
        Object.assign(oldFilter, filter)
      } else {
        this.filters.push(filter)
      }

      this.fetch({ page: 1 })
    },

    /**
     * @param {String} column
     * @param {String} direction
     */
    setTableOrdering (column, direction = 'asc') {
      this.$refs.table.setOrdering(column, direction)
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '~assets/sass/_mixins';
// @include media-breakpoint-up(sm) {
@media (min-width: 576px) {
  .data-grid-search {
    max-width: 260px;
  }
}
</style>
