import { Op } from 'sequelize'

export default {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  pool: {
    max: 20,
    idle: 30000,
  },
  logging: false,
  operatorsAliases: Op,
  define: {
    timestamps: false,
  },
  timezone: process.env.TZ,
}
