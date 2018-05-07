import Sequelize from 'sequelize'
import _ from 'lodash'
import config from 'todos/config/postgres'

let connections = {}

/**
 * Create unique connection per database and reuse it entire system.
 * @param  {String} database Database's name
 * @return {Object}          Connection
 */
export const create = (database) => {
  let connection = _.get(connections, 'database', false)

  if (!connection) {
    connection = new Sequelize(database, config.username, config.password, config)
    connections[database] = connection
  }

  return connection
}

/**
 * Connection generator with define schema
 * @param  {String} options.database Database's name
 * @param  {String} options.table    Table's name
 * @param  {Object} options.schema   Schema definition
 * @param  {Object} options.options  Options for schema
 * @return {Sequelize}               Object-Relational Mapping
 */
export const connect = ({ database, table, schema, options = {} }) => {
  const connection = create(database)
  return connection.define(table, schema, options)
}

export default connect
