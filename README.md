# LINE Todos

LINE BOT for helping people manage their todo list.

## Installation

1. Open LINE application.
2. Scan the following QR code to add bot as your friend

![QR Code](todos-qrcode.png)

## Usage

### Create Task

Typing the following message pattern to create task

`{task} : {date} : {time}`

eg.

`Watch movie : 22/05/18 : 19:00`

`Watch movie : 22/05/18` -- default time will be `00:00` (12:00 PM)

The system also provide alias date as following

`Watch movie : Today : 20:00`

`Watch movie : Tomorrow`

Alias date list:
- Today
- Tomorrow
- Next week
- Next month
- Next year

### Update Task
Send "edit" message, system will send you a link to update task.

### Help

We provide information about how to use bot when you send a message `Help` or `ช่วยเหลือ`.

### Contribute

If you need to run this project in your local machine you need to following this step.

#### Prerequisite

- [Docker](https://www.docker.com/get-docker) for virtual environment for local machine.
- [ngrok](https://ngrok.com/) for expose your local machine to public when develop your bot.

#### Local development

1. Copy .env.example to .env
2. Setup your setting in .env
3. Run ngrok in separate terminal during development
4. Run `yarn migrate db:create todos`
5. Run `yarn migrate up`
6. Run `docker-compose up` at this folder to running docker for local development

PS. `Dockerfile` for deploy to any cloud such as Heroku, AWS, GCP, etc.