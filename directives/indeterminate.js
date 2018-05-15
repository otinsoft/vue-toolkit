export default {
  bind (el, binding) {
    el.indeterminate = binding.value === true
  },

  update (el, binding) {
    el.indeterminate = binding.value === true
  }
}
