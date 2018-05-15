<template>
  <div class="data-grid-search">
    <input type="text" name="search" class="form-control"
           placeholder="Search" autocomplete="off" @input="onSearch">
  </div>
</template>

<script>
import debounce from 'debounce'

export default {
  name: 'DataGridSearch',

  methods: {
    /**
     * @param {Event} e
     */
    onSearch: debounce(function (e) {
      this.$emit('search', e.target.value.trim())
    })
  }
}
</script>
