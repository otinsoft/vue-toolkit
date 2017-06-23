import Vue from 'vue'
import formatDuration from '../utils/format-duration'

Vue.filter('formatDuration', val => val ? formatDuration(val) : '')
