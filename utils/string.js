import _ from 'lodash'

/**
 * Standardize string to same style for match pattern with system
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
export const standardize = message => _.trim(_.lowerCase(message)).replace(/(\n+|\s+)/g, '')

/**
 * Break message to match task pattern
 * @param  {String} message  User's sending message
 * @param  {String} splitter a splitter to split message
 * @return {Object}
 */
export const getTaskPattern = (message, splitter) => {
  const messages = message.split(splitter)
  const isCreate = messages.length > 1 && !_.isEmpty(messages[1])

  return {
    isCreate,
    task: _.trim(messages[0]),
    date: _.trim(messages[1]),
    time: _.isEmpty(messages[2]) ? '00:00' : _.trim(messages[2]),
  }
}

/**
 * Matching message with pre-defined message and sending reply message back
 * @param  {String} message           Inform message
 * @param  {Object} predefineMessages Pre-defined messages
 * @param  {Object} replyMessages     Reply message list
 * @return {String|Boolean}           Message for sending if it's match
 */
export const matchReplyMessage = (message, predefineMessages, replyMessages) => {
  const standardizedMessage = standardize(message)
  const replyKey = _.get(predefineMessages, standardizedMessage, false)
  if (replyKey) {
    return replyMessages[replyKey]
  }

  return false
}
