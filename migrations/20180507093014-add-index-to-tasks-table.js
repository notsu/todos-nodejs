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
  db.addIndex('tasks', 'edit', ['line_id', 'priority', 'due_datetime'], false).then(() => {
    db.addIndex('tasks', 'daily', ['due_datetime'], false)
  })
  return null
}

exports.down = function(db) {
  db.removeIndex('tasks', 'edit').then(() => {
    db.removeIndex('tasks', 'edit')
  })
  return null
}

exports._meta = {
  version: 1,
}
