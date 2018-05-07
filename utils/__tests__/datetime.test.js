import _ from 'lodash'
import { aliasDate } from 'todos/config/datetimes'
import { isAliasDate, isValidDate, isValidTime } from 'todos/utils/datetime'

test(`isAliasDate will be valid when invoke with value - ${_.keys(aliasDate).join(', ')}`, () => {
  _.forEach(aliasDate, (value, key) => {
    expect(isAliasDate(key, aliasDate)).toMatchObject(value)
    expect(isAliasDate(_.toUpper(key), aliasDate)).toMatchObject(value)
  })
})

test('isValidDate will be valid when provide the right date format', () => {
  expect(isValidDate('8/1/2018')).toBe(true)
  expect(isValidDate('08/1/2018')).toBe(true)
  expect(isValidDate('28/01/2018')).toBe(true)
  expect(isValidDate('31/12/18')).toBe(true)

  expect(isValidDate(0)).toBe(false)
  expect(isValidDate('0')).toBe(false)
  expect(isValidDate('random-some-string')).toBe(false)
  expect(isValidDate('30/02/2018')).toBe(false)
  expect(isValidDate('30/13/2018')).toBe(false)
  expect(isValidDate('32/1/2018')).toBe(false)
  expect(isValidDate('32/13/2018')).toBe(false)
})

test('isValidTime will be valid when provide the right time format', () => {
  expect(isValidTime('11:13')).toBe(true)
  expect(isValidTime('01:50')).toBe(true)
  expect(isValidTime('01:06')).toBe(true)
  expect(isValidTime('23:10')).toBe(true)

  expect(isValidTime('25:00')).toBe(false)
  expect(isValidTime('23:60')).toBe(false)
  expect(isValidTime('25:60')).toBe(false)
  expect(isValidTime('1113')).toBe(false)
  expect(isValidTime(0)).toBe(false)
  expect(isValidTime('random-some-string')).toBe(false)
})