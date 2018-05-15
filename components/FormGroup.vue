<template>
  <div class="form-group">
    <label v-if="label">{{ label }}</label>
    <slot/>
    <has-error :form="form" :field="field"/>
  </div>
</template>

<script>
export default {
  name: 'FormGroup',

  props: {
    form: {
      type: Object,
      required: true
    },

    field: {
      type: String,
      required: true
    },

    label: {
      type: String,
      default: null
    }
  }
}
</script>
