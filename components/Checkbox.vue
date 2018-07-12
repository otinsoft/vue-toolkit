<template>
  <label class="custom-control custom-checkbox mb-0">
    <input
      :id="id"
      :name="name"
      type="checkbox"
      :checked="internalValue"
      class="custom-control-input"
      v-indeterminate="indeterminate"
      @click="handleClick">
    <span class="custom-control-label font-weight-normal">
      <slot/>
    </span>
    <slot name="feedback"/>
  </label>
</template>

<script>
export default {
  name: 'Checkbox',

  props: {
    id: { type: String, default: null },
    name: { type: String, default: 'checkbox' },
    value: { type: Boolean, default: false },
    checked: { type: Boolean, default: false },
    indeterminate: { type: Boolean, default: false }
  },

  data () {
    return { internalValue: this.value }
  },

  watch: {
    value (val) {
      this.internalValue = val
    },

    checked (val) {
      this.internalValue = val
    },

    internalValue (val, oldVal) {
      if (val !== oldVal) {
        this.$emit('input', val)
      }
    }
  },

  created () {
    if ('checked' in this.$options.propsData) {
      this.internalValue = this.checked
    }
  },

  methods: {
    handleClick (e) {
      this.$emit('click', e)

      if (!e.isPropagationStopped) {
        this.internalValue = e.target.checked
      }
    }
  }
}
</script>
