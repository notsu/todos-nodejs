/**
 * Splitter for split message from user to classify message.
 * @type {String}
 */
export const splitter = ' : '

/**
 * Pre-defined message fo catch message from user and then reply back as configured.
 * @type {Object}
 */
export const predefineMessages = {
  edit: 'edit',
  'แก้ไข': 'edit',
  help: 'help',
  'ช่วยเหลือ': 'help'
}

/**
 * Reply messages which defined to reply to users.
 * @type {Object}
 */
export const replyMessages = {
  help: `
🔥 Create task format:
{task} : {date} : {time}

eg.
Watch movie : 22/05/18 : 19:00
Watch movie : 22/05/18
Watch movie : Today
Watch movie : Tomorrow

If you're not specific time it will be set as "00:00" (12:00 PM) as default

Alias date list:
- Today
- Tomorrow
- Next week
- Next month
- Next year

🔥 Update task:
Send "edit" message, system will send you a link to update task

🔥 Daily summary:
System will send daily summary of your task every "12:00 PM" and "6:00 PM"
  `,
  edit: `You can edit your tasks at: ${process.env.HOST}`,
  nomatch: `
Sorry, you're not sending the right message pattern.

Type "help" or "ช่วยเหลือ" and sending to us to see all available command
  `,
  malfunction: 'Sorry, the system support only with message type by 1-1 messaging 🙏',
}

export default {
  splitter,
  predefineMessages,
  replyMessages,
}
