import Task from 'todos/models/tasks'
import moment from 'todos/utils/moment'

/**
 * Get tasks from current user.
 * @param  {Object} req Request
 * @param  {Object} res Response
 * @return {null}
 */
export const tasks = async (req, res) => {
  let myTasks = await Task.findAll({
    where: {
      line_id: req.user.id,
    },
    order: [['priority', 'DESC'], ['due_datetime', 'ASC']],
  })

  myTasks = myTasks.map(task => {
    task.dateDisplay = moment(task.due_datetime).format('LLLL')
    return task
  })
  res.render('index', { user: req.user, myTasks })
}

/**
 * Modify value of task by specific attribute.
 * @param  {Object} req   Request
 * @param  {Object} res   Response
 * @param  {String} key   Attribute which need to modify
 * @param  {any}    value Value which need to be
 * @return {null}
 */
const markTask = async (req, res, key, value) => {
  const id = parseInt(req.params.id, 10)
  const selectedTask = await Task.findById(id)

  if (selectedTask && selectedTask.line_id === req.user.id) {
    selectedTask[key] = value
    selectedTask.updated_datetime = new Date()
    await selectedTask.save()
  }

  res.redirect('/')
}

/**
 * Mark task as important.
 * @param  {Object} req Request
 * @param  {Object} res Response
 * @return {null}
 */
export const markAsImportant = async (req, res) => await markTask(req, res, 'priority', 1)

/**
 * Mark task as unimportant.
 * @param  {Object} req Request
 * @param  {Object} res Response
 * @return {null}
 */
export const markAsUnImportant = async (req, res) => await markTask(req, res, 'priority', 0)

/**
 * Mark task as done.
 * @param  {Object} req Request
 * @param  {Object} res Response
 * @return {null}
 */
export const markAsDone = async (req, res) => await markTask(req, res, 'status', 1)

/**
 * Mark task as undone.
 * @param  {Object} req Request
 * @param  {Object} res Response
 * @return {null}
 */
export const markAsUnDone = async (req, res) => await markTask(req, res, 'status', 0)
