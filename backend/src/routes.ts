import {Router} from 'express'

import UserController from './controllers/UserController'
import PostController from './controllers/PostController'
import Auth from './middlewares/Auth'

const routes = Router()

routes.get('/users', UserController.index)
routes.post('/register', UserController.create)
routes.post('/forgotPassword', UserController.forgotPassword)
routes.post('/resetPassword', UserController.resetPassword)


routes.use(Auth.auth)
//Authentication routes

routes.post('/login', UserController.authenticate)

//About Post Controller
routes.get('/', PostController.index)
routes.post('/', PostController.create)
routes.get('/:postId', PostController.onePost)
routes.put('/:postId', PostController.update)
routes.delete('/:postId', PostController.delete)


export default routes