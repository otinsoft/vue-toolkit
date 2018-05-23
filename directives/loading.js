import Vue from 'vue'
import loadingVue from '../components/Loading'

const LoadingCtor = Vue.extend(loadingVue)

const Loading = {
  name: 'loading',

  bind (el, binding) {
    el.loading = new LoadingCtor({
      el: document.createElement('div')
    })

    toggleLoading(el, binding)
  },

  update (el, binding) {
    toggleLoading(el, binding)
  },

  unbind (el, binding) {
    if (el.loading &&
      el.loading.$el.parentNode &&
      el.loading.$el.parentNode.removeChild(el.loading.$el)) {
      toggleLoading(el, { value: false })
    }
  },

  install (Vue) {
    Vue.directive(Loading.name, Loading)
  }
}

const toggleLoading = (el, binding) => {
  if (binding.value) {
    insertDom(el, binding)

    el.loading.visible = true
  } else {
    el.loading.$once('after-leave', () => {
      el.classList.remove('el-loading-parent')
    })

    el.loading.visible = false
  }
}

const insertDom = (el, binding) => {
  el.appendChild(el.loading.$el)

  el.classList.add('el-loading-parent')
}

export default Loading
