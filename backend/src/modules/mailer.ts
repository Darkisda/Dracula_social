import { createTransport } from 'nodemailer'
import {resolve} from 'path'

const hbs = require('nodemailer-express-handlebars')

import {host, pass, port, user} from '../config/mail.json'

const transport = createTransport({
    host: host,
    port: port,
    auth: {
        user: user,
        pass: pass
  }
})

transport.use('compile', hbs({
    viewEngine: {
        extName: '.hbs',
        partialsDir: resolve('./src/resources/mail/auth/'),
        layoutsDir: resolve('./src/resources/mail/auth/'),
        defaultLayout: ''
    },
    viewPath: resolve('./src/resources/mail/'),
    extName: '.html',
}))

export default transport