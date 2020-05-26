import {Router} from 'express'

import UserController from './controllers/UserController'
import Auth from './middlewares/Auth'

const routes = Router()

routes.get('/users', UserController.index)
routes.post('/register', UserController.create)



routes.use(Auth.auth)
//Authentication routes
routes.post('/login', UserController.authenticate)
routes.post('/forgotPassword', UserController.forgotPassword)


export default routes