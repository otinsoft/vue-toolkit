<template>
  <transition name="el-loading-fade" @after-leave="handleAfterLeave">
    <div v-show="visible" class="el-loading-mask">
      <div class="el-loading-spinner">
        <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none"/>
        </svg>
        <p v-if="text" class="el-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data: () => ({
    text: null,
    visible: false
  }),

  methods: {
    handleAfterLeave () {
      this.$emit('after-leave')
    }
  }
}
</script>
