import format from 'date-fns/esm/format'
import en from 'date-fns/esm/locale/en-US'

const DateFns = {
  locale: 'en',
  locales: { en },
  dateFormat: 'MMM DD, YYYY',
  dateTimeFormat: 'MMM DD, YYYY, hh:mm A'
}

/**
 * Format date.
 *
 * @param  {Date|String|Number} date
 * @param  {String} formatStr
 * @return {String}
 */
DateFns.date = (date, formatStr = DateFns.dateFormat) => {
  return format(date, formatStr, {
    locale: DateFns.locales[DateFns.locale] || en
  })
}

/**
 * Format datetime.
 *
 * @param  {Date|String|Number} date
 * @return {String}
 */
DateFns.dateTime = date => format(date, DateFns.dateTimeFormat)

/**
 * Set the current locale.
 *
 * @param {String} locale
 */
DateFns.setLocale = locale => {
  DateFns.locale = locale
}

/**
 * Add more locales.
 *
 * @param {Object} locales
 */
DateFns.addLocales = locales => {
  Object.keys(locales).forEach(locale => {
    DateFns.locales[locale] = locales[locale]
  })
}

export default DateFns
