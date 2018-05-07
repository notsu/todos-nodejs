/**
 * Authentication controller
 * @param  {Object} req Request
 * @param  {Object} res Response
 * @return {null}
 */
export const auth = (req, res) => {}

/**
 * Authentication callback controller
 * @param  {Object} req Request
 * @param  {Object} res Response
 * @return {null}
 */
export const authCallback = (req, res) => {
  res.redirect('/')
}

/**
 * Logout controller
 * @param  {Object} req Request
 * @param  {Object} res Response
 * @return {null}
 */
export const logout = (req, res) => {
  req.logout()
  res.redirect('/')
}