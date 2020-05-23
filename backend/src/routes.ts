import {Router} from 'express'

import UserController from './controllers/UserController'

const routes = Router()

routes.get('/users', UserController.index)
routes.post('/users', UserController.create)
routes.post('/login', UserController.authenticate)


export default routes