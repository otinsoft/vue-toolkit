import autosize from 'autosize'

export default {
  bind (el) {
    autosize(el)
  },

  update (el) {
    autosize.update(el)
  },

  unbind (el) {
    autosize.destroy(el)
  }
}
