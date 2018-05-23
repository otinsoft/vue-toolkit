import autosize from 'autosize'

const Autosize = {
  name: 'autosize',

  bind (el) {
    autosize(el)
  },

  update (el) {
    autosize.update(el)
  },

  unbind (el) {
    autosize.destroy(el)
  },

  install (Vue) {
    Vue.directive(Autosize.name, Autosize)
  }
}

export default Autosize
