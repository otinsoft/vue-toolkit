<template>
  <div class="custom-checkbox-group" role="group" aria-label="checkbox-group">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'CheckboxGroup',

  componentName: 'CheckboxGroup',

  props: {
    value: { type: Array, default: undefined },
    disabled: { type: Boolean, default: false },
    min: { type: Number, default: undefined },
    max: { type: Number, default: undefined }
  }
}
</script>
