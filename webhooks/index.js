import _ from 'lodash'
import { predefineMessages, replyMessages, splitter } from 'todos/config/messages'
import { aliasDate } from 'todos/config/datetimes'
import line from 'todos/connectors/line'
import tasks from 'todos/models/tasks'
import { standardize, matchReplyMessage, getTaskPattern } from 'todos/utils/string'
import { convertToDatetime } from 'todos/utils/datetime'
import Tasks from 'todos/models/tasks'

/**
 * Event handler
 * @param  {Object} event Event object from LINE
 * @return {null}
 */
const eventHandler = async event => {
  const eventType = _.get(event, 'type', false)
  const messageType = _.get(event, 'message.type', false)
  let text = replyMessages.nomatch

  if (eventType === 'message' && messageType === 'text') {
    const message = _.get(event, 'message.text', '')
    const standardizedMessage = standardize(message)

    const matchedMessage = matchReplyMessage(message, predefineMessages, replyMessages)
    const { isCreate, task, date, time } = getTaskPattern(message, splitter)

    if (matchedMessage) {
      text = matchedMessage
    } else if (isCreate) {
      const datetime = convertToDatetime(date, time, aliasDate)
      if (datetime) {
        const now = new Date()
        const taskObj = await Tasks.create({
          task,
          line_id: event.source.userId,
          priority: 0,
          status: 0,
          due_datetime: datetime,
          created_datetime: now,
          updated_datetime: now,
        })
        text = `
🔥 Task: ${task}
🕒 Datetime: ${datetime.format('D MMMM YYYY เวลา HH:mm')}

ADDED!

You can edit your task at: ${process.env.HOST}
          `
      }
    }
  }

  line.replyMessage(event.replyToken, {
    type: 'text',
    text,
  })
}

export default (req, res) => {
  Promise.all(req.body.events.map(eventHandler)).then(result => res.json(result))
}
