<template>
  <button :type="nativeType" :disabled="loading" :class="{
    'btn': true,
    [`btn-${type}`]: true,
    'btn-block': block,
    'btn-lg': size === 'lg',
    'btn-sm': size === 'sm',
    'btn-loading': loading
  }" @click="$emit('click')">
    <span v-if="icon" class="mr-1">
      <fa :icon="icon"/>
    </span>
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'VButton',

  props: {
    type: {
      type: String,
      default: 'primary'
    },
    nativeType: {
      type: String,
      default: 'submit'
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: [String, Array],
      default: null
    },
    block: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: null
    }
  }
}
</script>

<style>
.btn-loading {
  position: relative;
  pointer-events: none;
  color: transparent !important;

  &:after {
    animation: spinAround 500ms infinite linear;
    border: 2px solid #dbdbdb;
    border-radius: 50%;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    content: "";
    display: block;
    height: 1em;
    width: 1em;
    position: absolute;
    left: calc(50% - (1em / 2));
    top: calc(50% - (1em / 2));
  }
}

@keyframes spinAround {
  from { transform: rotate(0deg); }
  to { transform: rotate(359deg); }
}
</style>
