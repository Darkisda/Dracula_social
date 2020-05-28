import {Router} from 'express'

import UserController from './controllers/UserController'
import Auth from './middlewares/Auth'

const routes = Router()

routes.get('/users', UserController.index)
routes.post('/register', UserController.create)
routes.post('/forgotPassword', UserController.forgotPassword)
routes.post('/resetPassword', UserController.resetPassword)


routes.use(Auth.auth)
//Authentication routes
routes.post('/login', UserController.authenticate)


export default routes