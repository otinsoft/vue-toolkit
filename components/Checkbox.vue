<template>
  <label
    :class="[
      { 'is-disabled': isDisabled },
      { 'is-checked': isChecked }
    ]"
    :aria-checked="indeterminate ? 'mixed': isChecked"
    :aria-disabled="isDisabled"
    :id="id"
    class="custom-control custom-checkbox"
    role="checkbox"
  >
    <input
      v-if="trueLabel || falseLabel"
      :name="name"
      :disabled="isDisabled"
      :true-value="trueLabel"
      :false-value="falseLabel"
      v-model="model"
      class="custom-control-input"
      type="checkbox"
      aria-hidden="true"
      @change="handleChange"
      @focus="focus = true"
      @blur="focus = false">
    <input
      v-else
      :disabled="isDisabled"
      :value="label"
      :name="name"
      v-model="model"
      class="custom-control-input"
      type="checkbox"
      aria-hidden="true"
      @change="handleChange"
      @focus="focus = true"
      @blur="focus = false">

    <span class="custom-control-label">
      <slot/>
      <template v-if="!$slots.default && label">{{ label }}</template>
    </span>

    <slot name="feedback"/>
  </label>
</template>

<script>
export default {
  name: 'Checkbox',

  props: {
    value: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    indeterminate: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    checked: { type: Boolean, default: false },
    name: { type: String, default: undefined },
    trueLabel: { type: [String, Number], default: undefined },
    falseLabel: { type: [String, Number], default: undefined },
    id: { type: String, default: undefined },
    controls: { type: String, default: undefined }
  },

  data: () => ({
    selfModel: false,
    focus: false,
    isLimitExceeded: false
  }),

  computed: {
    model: {
      get () {
        return this.isGroup
          ? this.store : this.value !== undefined
            ? this.value : this.selfModel
      },

      set (val) {
        if (this.isGroup) {
          this.isLimitExceeded = false;
          (this._checkboxGroup.min !== undefined &&
            val.length < this._checkboxGroup.min &&
            (this.isLimitExceeded = true));

          (this._checkboxGroup.max !== undefined &&
            val.length > this._checkboxGroup.max &&
            (this.isLimitExceeded = true))

          this.isLimitExceeded === false &&
          this._checkboxGroup.$emit('input', val)
        } else {
          this.$emit('input', val)
          this.selfModel = val
        }
      }
    },

    isChecked () {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel
      }
    },

    isGroup () {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'CheckboxGroup') {
          parent = parent.$parent
        } else {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this._checkboxGroup = parent
          return true
        }
      }
      return false
    },

    store () {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value
    },

    isDisabled () {
      return this.isGroup
        ? this._checkboxGroup.disabled || this.disabled
        : this.disabled
    }
  },

  created () {
    this.checked && this.addToStore()
  },
  mounted () {
    if (this.indeterminate) {
      this.$el.setAttribute('aria-controls', this.controls)
    }
  },

  methods: {
    addToStore () {
      if (
        Array.isArray(this.model) &&
        this.model.indexOf(this.label) === -1
      ) {
        this.model.push(this.label)
      } else {
        this.model = this.trueLabel || true
      }
    },
    handleChange (ev) {
      if (this.isLimitExceeded) return
      let value
      if (ev.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel
      }
      this.$emit('change', value, ev)
      this.$nextTick(() => {
        if (this.isGroup) {
          this._checkboxGroup.$emit('change', this._checkboxGroup.value)
        }
      })
    }
  }
}
</script>
