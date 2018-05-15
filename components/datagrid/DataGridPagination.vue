<template>
  <div class="row">
    <div class="col-sm-6 text-center-sm">
      <template v-if="pagination.total > pagination.per_page">
        Showing {{ start }} to {{ end }} of {{ pagination.total }} entries
      </template>
      <template v-else-if="pagination.total > 0">
        {{ pagination.total }} entries
      </template>
    </div>
    <div class="col-sm-6">
      <pagination :pagination="pagination" alignment="end" size="sm" @change="onChange"/>
    </div>
  </div>
</template>

<script>
import Pagination from '../Pagination'

export default {
  name: 'DataGridPagination',

  components: {
    Pagination
  },

  props: {
    pagination: {
      type: Object,
      required: true
    }
  },

  computed: {
    /**
     * @return {Number}
     */
    start () {
      return (this.pagination.current_page - 1) * this.pagination.per_page + 1
    },

    /**
     * @return {Number}
     */
    end () {
      return Math.min(this.pagination.current_page * this.pagination.per_page, this.pagination.total)
    }
  },

  methods: {
    /**
     * @param {Number} page
     */
    onChange (page) {
      this.$emit('change', page)
    }
  }
}
</script>
