/**
 * Alias date to create custom date refer to current date
 * @type {Object}
 */
export const aliasDate = {
  'today': {
    'add': 0,
    'unit': 'day',
  },
  'tomorrow': {
    'add': 1,
    'unit': 'day',
  },
  'nextweek': {
    'add': 1,
    'unit': 'week',
  },
  'nextmonth': {
    'add': 1,
    'unit': 'month',
  },
  'nextyear': {
    'add': 1,
    'unit': 'year',
  },
}

export default {
  aliasDate,
}