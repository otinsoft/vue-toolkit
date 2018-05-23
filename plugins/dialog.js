import Vue from 'vue'
import dialogVue from '../components/Dialog'

const Dialog = { i18n: undefined }
const DialogCtor = Vue.extend(dialogVue)

/**
 * Show a dialog.
 *
 * @param  {Object} options
 * @return {Promise}
 */
Dialog.show = (options = {}) => {
  const dialog = new DialogCtor({
    propsData: {
      cancelButtonText: Dialog.i18n.t('dialog_cancel'),
      confirmButtonText: Dialog.i18n.t('dialog_confirm'),
      ...options
    }
  })

  const el = document.createElement('div')
  document.body.appendChild(el)
  dialog.$mount(el)

  dialog.$on('hidden', () => {
    dialog.$el.parentNode.removeChild(dialog.$el)
    dialog.$destroy()
  })

  return new Promise((resolve, reject) => {
    dialog.$on('confirm', resolve)
    dialog.$on('cancel', reject)
  })
}

Dialog.info = (options = {}) => Dialog.show({ type: 'info', ...options })
Dialog.success = (options = {}) => Dialog.show({ type: 'success', ...options })
Dialog.warning = (options = {}) => Dialog.show({ type: 'warning', ...options })
Dialog.danger = (options = {}) => Dialog.show({ type: 'danger', ...options })

Dialog.confirmDeletion = (options = {}) => Dialog.danger({
  showCancelButton: true,
  cancelButtonText: Dialog.i18n.t('confirm_deletion_dialog_cancel'),
  confirmButtonText: Dialog.i18n.t('confirm_deletion_dialog_confirm'),
  confirmButtonClass: 'btn-danger',
  ...options
})

Dialog.install = (Vue, { i18n } = {}) => {
  Vue.prototype.$dialog = Dialog

  if (i18n) {
    Dialog.i18n = i18n
  }
}

export default Dialog
