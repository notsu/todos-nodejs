'use strict'

var dbm
var type
var seed

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedLink
}

exports.up = function(db, callback) {
  db.createTable(
    'tasks',
    {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      task: { type: 'string', length: 300 },
      line_id: { type: 'string', length: 140 },
      priority: { type: 'int' },
      status: { type: 'int' },
      due_datetime: { type: 'datetime' },
      created_datetime: { type: 'datetime' },
      updated_datetime: { type: 'datetime' },
    },
    callback
  )
  return null
}

exports.down = function(db) {
  db.dropTable('dropDatabase')
  return null
}

exports._meta = {
  version: 1,
}
