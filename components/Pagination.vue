<template>
  <nav>
    <ul v-if="pagination.total > pagination.per_page" :class="{
          'pagination-sm': size === 'sm',
          'justify-content-end': alignment === 'end',
          'justify-content-center': alignment === 'center'
        }"
        class="pagination mb-0"
    >
      <li :class="{ disabled: currentPage == 1 }" class="page-item">
        <a class="page-link" title="Previous"
           aria-label="Previous" href="#" @click="handleClick($event, prevPage || 1)">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>

      <li v-if="firstAdjacentPage > 1" class="page-item">
        <a class="page-link" href="#" @click="handleClick($event, 1)" >1</a>
      </li>

      <li v-if="firstAdjacentPage > 2" class="page-item disabled">
        <span class="page-link">...</span>
      </li>

      <li v-for="page in lastAdjacentPage" v-if="page >= firstAdjacentPage"
          :class="{ active: currentPage === page }" :key="page" class="page-item">
        <a class="page-link" href="#" @click="handleClick($event, page)">
          {{ page }}
        </a>
      </li>

      <li v-if="lastAdjacentPage < lastPage - 1" class="page-item disabled">
        <span class="page-link">...</span>
      </li>

      <li v-if="lastAdjacentPage < lastPage" class="page-item">
        <a href="#" class="page-link" @click="handleClick($event, lastPage)">
          {{ lastPage }}
        </a>
      </li>

      <li :class="{ disabled: currentPage === lastPage }" class="page-item">
        <a class="page-link" title="Next"
           aria-label="Next" href="#" @click="handleClick($event, nextPage || lastPage)">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    pagination: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: null
    },
    alignment: {
      type: String,
      default: null
    }
  },

  computed: {
    lastPage () { return this.pagination.last_page },
    currentPage () { return this.pagination.current_page },
    firstAdjacentPage () { return this.adjacentPages().first },
    lastAdjacentPage () { return this.adjacentPages().last },
    prevPage () {
      return this.currentPage > 1 ? this.currentPage - 1 : null
    },
    nextPage () {
      return this.lastPage > this.currentPage ? this.currentPage + 1 : null
    }
  },

  watch: {
    pagination (value) {
      this.pagination = value
    }
  },

  methods: {
    /**
     * Handle click event.
     *
     * @param {Event} e
     * @param {Number} page
     */
    handleClick (e, page) {
      e.preventDefault()

      if (this.currentPage !== page) {
        this.$emit('change', page, e)
      }
    },

    /**
     * Get the first and last adjacent pages.
     *
     * @return {Object} { first: Number, last: Number }
     */
    adjacentPages () {
      const count = 1
      let first, last

      if (this.currentPage <= count * 2) {
        first = 1
        last = Math.min(1 + count * 2, this.lastPage)
      } else if (this.currentPage > this.lastPage - count * 2) {
        last = this.lastPage
        first = this.lastPage - count * 2
      } else {
        first = this.currentPage - count
        last = this.currentPage + count
      }

      return { first, last }
    }
  }
}
</script>
