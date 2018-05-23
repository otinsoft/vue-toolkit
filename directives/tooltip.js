import $ from 'jquery'

const Tooltip = {
  name: 'tooltip',

  bind (el) {
    $(el).tooltip()
  },

  update (el) {
    $(el).tooltip('update')
  },

  unbind (el) {
    $(el).tooltip('dispose')
  },

  install (Vue) {
    Vue.directive(Tooltip.name, Tooltip)
  }
}

export default Tooltip
