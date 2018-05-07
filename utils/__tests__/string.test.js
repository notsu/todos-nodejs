import { predefineMessages, replyMessages } from 'todos/config/messages'
import { standardize, getTaskPattern, matchReplyMessage } from 'todos/utils/string'

test('standardize will work as expected in any condition', () => {
  expect(standardize('ToDaY')).toEqual('today')
  expect(standardize('T o D a Y')).toEqual('today')
  expect(standardize(`T\no\nD\na\nY`)).toEqual('today')
  expect(standardize(`Next Week`)).toEqual('nextweek')
  expect(standardize(`Ne xtW eek`)).toEqual('nextweek')
  expect(standardize(`NEXTWEEK`)).toEqual('nextweek')
})

test('getTaskPattern will be work as expected', () => {
  ;[' : ', ' - ', ' | '].forEach(splitter => {
    expect(getTaskPattern(`กินข้าว${splitter}tomorrow${splitter}10:00`, splitter)).toMatchObject({
      isCreate: true,
      task: 'กินข้าว',
      date: 'tomorrow',
      time: '10:00',
    })

    expect(getTaskPattern(`กินข้าว${splitter}tomorrow${splitter}`, splitter)).toMatchObject({
      isCreate: true,
      task: 'กินข้าว',
      date: 'tomorrow',
      time: '00:00',
    })

    expect(getTaskPattern(`กินข้าว${splitter}tomorrow`, splitter)).toMatchObject({
      isCreate: true,
      task: 'กินข้าว',
      date: 'tomorrow',
      time: '00:00',
    })

    expect(
      getTaskPattern(
        `
      กินข้าว
      ${splitter}
      tomorrow
      ${splitter}
      12:00
    `,
        splitter
      )
    ).toMatchObject({
      isCreate: true,
      task: 'กินข้าว',
      date: 'tomorrow',
      time: '12:00',
    })

    expect(getTaskPattern(`กินข้าว${splitter}`, splitter)).toMatchObject({
      isCreate: false,
      task: 'กินข้าว',
    })
  })
})

test('matchReplyMessage will be return reply message when keyword matched with predefine messages', () => {
  expect(matchReplyMessage('help', predefineMessages, replyMessages)).toEqual(replyMessages['help'])
  expect(matchReplyMessage('HELP', predefineMessages, replyMessages)).toEqual(replyMessages['help'])
  expect(matchReplyMessage('ช่วยเหลือ', predefineMessages, replyMessages)).toEqual(replyMessages['help'])
  expect(matchReplyMessage('H E L P', predefineMessages, replyMessages)).toEqual(replyMessages['help'])
  expect(matchReplyMessage(`H\nE\nL\nP`, predefineMessages, replyMessages)).toEqual(replyMessages['help'])

  expect(matchReplyMessage(`some-random-string`, predefineMessages, replyMessages)).toBe(false)
})
