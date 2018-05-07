import _ from 'lodash'
import moment from 'todos/utils/moment'
import { standardize } from 'todos/utils/string'

/**
 * Is inform alias date is valid
 * @param  {String} date    Inform date
 * @param  {Object} aliases Aliases which available
 * @return {Object|Boolean} It's will be false if it's not valid, but return object configuration when it's valid
 */
export const isAliasDate = (date, aliases) => {
  const standardizedDate = standardize(date)
  return _.get(aliases, standardizedDate, false)
}

/**
 * Is inform date is valid
 * @param  {String} date Inform date
 * @return {Boolean}
 */
export const isValidDate = date => {
  let [dateInput, monthInput, yearInput] = String(date).split('/')

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  if ((!(yearInput % 4) && yearInput % 100) || !(yearInput % 400)) {
    daysInMonth[1] = 29
  }

  return !/\D/.test(String(dateInput)) && dateInput > 0 && dateInput <= daysInMonth[--monthInput]
}

/**
 * Is inform time is valid
 * @param  {String} time Inform time
 * @return {Boolean}
 */
export const isValidTime = time => {
  return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time)
}

/**
 * Convert date and time for more generic date time for system
 * @param  {String} date    Inform date
 * @param  {String} time    Inform time
 * @param  {Object} aliases Available aliases
 * @return {Object}         Moment
 */
export const convertToDatetime = (date, time, aliases) => {
  if (!(isAliasDate(date, aliases) || isValidDate(date, aliases)) || !isValidTime(time)) {
    return false
  }

  const [dateInput, monthInput, yearInput] = date.split('/')
  const [hour, minute] = time.split(':')
  const alias = isAliasDate(date, aliases)

  if (alias) {
    return moment()
      .add(alias.add, alias.unit)
      .set({
        hour: parseInt(hour, 10),
        minute: parseInt(minute, 10),
      })
  }

  return moment().set({
    date: parseInt(dateInput, 10),
    month: parseInt(monthInput, 10) - 1,
    year: parseInt(yearInput, 10) + (parseInt(yearInput, 10).toString().length == 2 ? 2000 : 0),
    hour: parseInt(hour, 10),
    minute: parseInt(minute, 10),
  })
}

export default {
  isAliasDate,
  isValidDate,
  isValidTime,
  convertToDatetime,
}
