const Indeterminate = {
  name: 'indeterminate',

  bind (el, binding) {
    el.indeterminate = binding.value === true
  },

  update (el, binding) {
    el.indeterminate = binding.value === true
  },

  install (Vue) {
    Vue.directive(Indeterminate.name, Indeterminate)
  }
}

export default Indeterminate
