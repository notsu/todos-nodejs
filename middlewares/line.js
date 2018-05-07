import { Strategy } from 'passport-line'
import config from 'todos/config/channels'

export const LineStrategy = new Strategy({
  channelID: config.login.channelID,
  channelSecret: config.login.channelSecret,
  callbackURL: config.login.callback,
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile)
})

export default {
  LineStrategy,
}
