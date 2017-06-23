import Vue from 'vue'
import formatSize from '../utils/format-size'

Vue.filter('formatSize', val => val ? formatSize(val) : '')
