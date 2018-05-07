import moment from 'todos/utils/moment'

test('Moment will be set time zone to Asia/Bangkok which matched with server', () => {
  const now = new Date()
  expect(moment(now).toISOString()).toEqual(now.toISOString())
})
