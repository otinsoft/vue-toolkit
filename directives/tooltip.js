import $ from 'jquery'

export default {
  bind (el) {
    $(el).tooltip()
  },

  update (el) {
    $(el).tooltip('update')
  },

  unbind (el) {
    $(el).tooltip('dispose')
  }
}
