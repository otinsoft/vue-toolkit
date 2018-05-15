import $ from 'jquery'

export default {
  name: 'Tooltip',

  props: {
    tag: {
      type: String,
      default: 'div'
    },

    title: {
      type: String,
      required: true
    },

    placement: {
      type: String,
      default: 'top'
    },

    container: {
      default: false
    }
  },

  watch: {
    title (val, oldVal) {
      this.destroyTooltip()
      this.initTooltip()
    }
  },

  render (h) {
    return h(
      this.tag,
      this.$slots.default
    )
  },

  mounted () {
    this.initTooltip()
  },

  beforeDestroy () {
    this.destroyTooltip()
  },

  methods: {
    initTooltip () {
      $(this.$el).tooltip({
        title: this.title,
        placement: this.placement,
        container: this.container
      })
    },

    destroyTooltip () {
      $(this.$el).tooltip('dispose')
    }
  }
}
