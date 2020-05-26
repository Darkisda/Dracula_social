import { createTransport } from 'nodemailer'
import path from 'path'

const hbs = require('nodemailer-express-handlebars')

import {host, pass, port, user} from '../config/mail.json'

const transport = createTransport({
    host,
    port,
    auth: {
        user,
        pass
  }
})

transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
}))

export default transport