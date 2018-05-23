<template>
  <modal ref="modal" v-bind="{ close, keyboard, backdrop, size, class: [`modal-${type}`] }">
    <h5 slot="title" v-html="title"/>

    <template slot="body">
      <div v-if="html" v-html="html"/>
      <div v-else>{{ text }}</div>
    </template>

    <template slot="footer">
      <button v-show="showCancelButton" :disabled="loading"
              type="button" class="btn btn-light text-muted" @click="handleAction('cancel')">
        {{ cancelButtonText }}
      </button>

      <button v-show="showConfirmButton" :disabled="loading"
              :class="{ [confirmButtonClass]: true, 'btn-loading': loading }" type="button" class="btn"
              @click="handleAction('confirm')">
        {{ confirmButtonText }}
      </button>
    </template>
  </modal>
</template>

<script>
import Modal from 'vmodal'

export default {
  components: {
    Modal
  },

  props: {
    type: {
      type: String,
      default: 'default'
    },
    close: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    html: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: null
    },
    showCancelButton: {
      type: Boolean,
      default: false
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    cancelButtonText: {
      type: String,
      default: 'Cancel'
    },
    confirmButtonText: {
      type: String,
      default: 'OK'
    },
    backdrop: {
      type: [Boolean, String],
      default: true
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    confirmButtonClass: {
      type: String,
      default: 'btn-primary'
    },
    preConfirm: {
      type: Function,
      default: null
    },
    showLoaderOnConfirm: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    loading: false,
    actionHandled: false
  }),

  mounted () {
    this.$refs.modal.show()

    this.$refs.modal.$on('hide', () => {
      if (!this.actionHandled) {
        this.handleAction('cancel')
      }
    })

    this.$refs.modal.$on('hidden', () => {
      this.$emit('hidden')
    })
  },

  methods: {
    handleAction (action) {
      this.actionHandled = true

      if (action === 'confirm' && this.showLoaderOnConfirm) {
        this.loading = true
      }

      const cb = () => {
        this.loading = false
        this.$emit(action)
        this.$refs.modal.hide()
      }

      if (action === 'confirm' && this.preConfirm) {
        const result = this.preConfirm(this)

        if (result instanceof Promise) {
          result.then(cb)
        } else {
          cb()
        }
      } else {
        cb()
      }
    }
  }
}
</script>
