import passport from 'passport'
import { LineStrategy } from 'todos/middlewares/line'

/**
 * Ensure a current user has been authenticated
 * @param  {Object}   req  Request
 * @param  {Object}   res  Response
 * @param  {Function} next Next tick
 * @return {null}
 */
export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/auth/line')
}

/**
 * Initialize Passport with LINE Strategy
 * @return {Object} Passport
 */
export const passportInitialize = () => {
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((obj, done) => {
    done(null, obj)
  })

  passport.use(LineStrategy)

  return passport
}

export default {
  passportInitialize,
  ensureAuthenticated,
}