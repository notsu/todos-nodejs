export default {
  /**
   * The configuration for BOT.
   * @type {Object}
   */
  bot: {
    channelAccessToken: process.env.LINE_BOT_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_BOT_CHANNEL_SECRET,
  },
  /**
   * The configuration for LINE login when user need to update task.
   * @type {Object}
   */
  login: {
    channelID: process.env.LINE_LOGIN_CHANNEL_ID,
    channelSecret: process.env.LINE_LOGIN_CHANNEL_SECRET,
    callback: process.env.LINE_LOGIN_CALLBACK,
  }
}
