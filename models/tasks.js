import { INTEGER, STRING, DATE, DATEONLY, BOOLEAN } from 'sequelize'
import { connect } from 'todos/connectors/postgres'

const database = 'todos'
const table = 'tasks'

const schema = {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  task: { type: STRING(300) },
  line_id: { type: STRING(140) },
  priority: { type: INTEGER },
  status: { type: INTEGER },
  due_datetime: { type: DATE },
  created_datetime: { type: DATE },
  updated_datetime: { type: DATE },
}

export default connect({
  database,
  table,
  schema,
})
