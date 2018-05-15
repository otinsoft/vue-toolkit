<template>
  <div v-if="showPanel" class="filter-panel">
    <div class="filter-panel-content px-2 pt-2 pb-1">
      <checkbox v-for="filter in filters" :key="filter.value"
                :checked="selected.includes(filter.value)"
                class="filter-panel-item mb-1 d-flex"
                @click="(e) => toggleFilter(e, filter)">
        {{ filter.text }}
      </checkbox>
    </div>

    <div class="filter-panel-footer px-1">
      <button :disabled="selected.length === 0" type="button" class="btn btn-link no-underline px-1 mr-2" @click="handleConfirm">
        Confirm
      </button>
      <button type="button" class="btn btn-link no-underline px-1" @click="handleReset">
        Reset
      </button>
    </div>
  </div>
</template>

<script>
import Checkbox from '../Checkbox'

export default {
  components: {
    Checkbox
  },

  props: {
    value: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    selected: [],
    showPanel: false
  }),

  created () {
    this.selected = [...this.value]
  },

  mounted () {
    document.addEventListener('click', this.handleDocumentClick)
  },

  beforeDestroy () {
    document.removeEventListener('click', this.handleDocumentClick)
  },

  methods: {
    show () { this.showPanel = true },

    hide () { this.showPanel = false },

    /**
     * @param {Event} e
     * @param {Object} filter
     */
    toggleFilter (e, filter) {
      e.stopPropagation()
      e.isPropagationStopped = true

      const index = this.selected.findIndex(v => v === filter.value)

      if (index > -1) {
        this.selected.splice(index, 1)
      } else {
        this.selected.push(filter.value)
      }
    },

    handleConfirm () {
      this.emitChange()
    },

    handleReset () {
      this.selected = []
      this.emitChange()
    },

    emitChange () {
      this.$emit('input', [...this.selected])

      setTimeout(() => this.hide(), 10)
    },

    /**
     * @param {Event} e
     */
    handleDocumentClick (e) {
      if (this.$el && !this.$el.contains(e.target)) {
        this.hide()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-panel {
  position: absolute;
  border-radius: 2px;
  cursor: initial;
  background-color: #fff;
  border: 1px solid #e6ebf5;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

.filter-panel-item {
  font-weight: normal;

  &:last-child {
    margin-bottom: 0 !important;
  }
}

.filter-panel-footer {
  border-top: 1px solid #e6ebf5;
}
</style>
