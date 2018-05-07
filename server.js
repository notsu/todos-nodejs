import 'babel-core/register'
import 'babel-polyfill'
import {} from 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import helmet from 'helmet'
import { middleware } from '@line/bot-sdk'
import config from 'todos/config/channels'
import webhook from 'todos/webhooks'
import errorHandler from 'todos/webhooks/errors'
import { passportInitialize, ensureAuthenticated } from 'todos/middlewares/passport'
import {
  markAsImportant,
  markAsUnImportant,
  markAsDone,
  markAsUnDone,
  tasks,
} from 'todos/controllers/tasks'
import { auth, authCallback, logout } from 'todos/controllers/auth'
import 'todos/crons/dailyBasis'

const isDev = process.env.NODE_ENV !== 'production'
const app = express()
const port = parseInt(process.env.PORT, 10) || 3000
const passport = passportInitialize()

app.use(helmet())
app.set('views', './views')

app.use('/webhook', middleware(config.bot), webhook)
app.use('/webhook', errorHandler)

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(bodyParser())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + '/public'))

app.get('/', ensureAuthenticated, tasks)
app.get('/tasks/:id/important', ensureAuthenticated, markAsImportant)
app.get('/tasks/:id/unimportant', ensureAuthenticated, markAsUnImportant)
app.get('/tasks/:id/done', ensureAuthenticated, markAsDone)
app.get('/tasks/:id/undone', ensureAuthenticated, markAsUnDone)

app.get('/auth/line', passport.authenticate('line'), auth)
app.get(
  '/auth/line/callback',
  passport.authenticate('line', { failureRedirect: '/auth/line' }),
  authCallback
)
app.get('/logout', logout)

app.use((req, res) => {
  res.status(404).send("404, This path doesn't exist!")
})

app.listen(port)
