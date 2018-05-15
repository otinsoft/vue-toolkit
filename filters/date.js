import DateFns from '../plugins/datefns'

export const date = (date, format) => date ? DateFns.date(date, format) : ''
export const dateTime = (date) => date ? DateFns.dateTime(date) : ''
