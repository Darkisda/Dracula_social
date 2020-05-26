import { createTransport } from 'nodemailer'

import {host, pass, port, user} from '../config/mail.json'

const transport = createTransport({
    host,
    port,
    auth: {
        user,
        pass
  }
})

export default transport