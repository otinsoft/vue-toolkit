import DateFns from '../plugins/datefns'
import differenceInSeconds from 'date-fns/esm/differenceInSeconds'

export default {
  name: 'VTime',

  props: {
    time: { type: String, required: true },
    maxTime: { type: Number, default: 86400 },
    autoUpdate: { type: Number, default: 60 }
  },

  computed: {
    /**
     * @return {Boolean}
     */
    useTimeago () {
      return !this.maxTime || differenceInSeconds(new Date(), this.time) <= this.maxTime
    }
  },

  render (h) {
    if (this.useTimeago) {
      return h('timeago', {
        props: {
          since: this.time,
          autoUpdate: this.autoUpdate,
          format: time => DateFns.dateTime(time)
        }
      })
    }

    return h('time', {
      attrs: {
        datetime: this.time,
        title: DateFns.dateTime(this.time)
      }
    }, DateFns.date(this.time))
  }
}
