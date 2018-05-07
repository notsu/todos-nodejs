import { Client } from '@line/bot-sdk'
import config from 'todos/config/channels'

export default new Client(config.bot)
