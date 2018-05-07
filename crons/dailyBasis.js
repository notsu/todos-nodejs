import _ from 'lodash'
import { CronJob } from 'cron'
import { Op } from 'sequelize'
import line from 'todos/connectors/line'
import Task from 'todos/models/tasks'
import moment from 'todos/utils/moment'

new CronJob(
  '0 0 0,18 * * *',
  async () => {
    const dailyTasks = await Task.findAll({
      where: {
        due_datetime: {
          [Op.gte]: moment().startOf('day'),
          [Op.lte]: moment().endOf('day'),
        },
      },
      order: [['due_datetime', 'ASC']],
    })

    const lineIds = {}

    dailyTasks.forEach(task => {
      if (!_.has(lineIds, task.line_id)) {
        lineIds[task.line_id] = {
          done: '',
          undone: '',
        }
      }

      if (task.status == 1) {
        lineIds[task.line_id]['done'] += `- ${task.task} - ${task.due_datetime}\n`
      } else {
        lineIds[task.line_id]['undone'] += `- ${task.task} - ${task.due_datetime}\n`
      }
    })

    let text = ''
    _.forEach(lineIds, (myTasks, lineId) => {
      text = ''
      text += `Task ประจำวันนี้

      Task ที่เสร็จแล้ว
    `

      if (!_.isEmpty(myTasks.done)) {
        text += myTasks.done
      } else {
        text += `(ยังไม่มี)`
      }

      text += `

      Task ที่ยังไม่เสร็จ
    `

      if (!_.isEmpty(myTasks.undone)) {
        text += myTasks.undone
      } else {
        text += `(ยังไม่มี)`
      }

      line.pushMessage(lineId, {
        type: 'text',
        text,
      })
    })
  },
  null,
  true,
  'Asia/Bangkok'
)
