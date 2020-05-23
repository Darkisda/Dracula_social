import { Request, Response } from 'express'
import {compare} from 'bcryptjs'

import User from '../schemas/User'

class UserController {
    public async index(request: Request, response: Response) {
        const users = await User.find()

        return response.json(users)
    }

    public async create(request: Request, response: Response) {
        
        const {email} = request.body

        try {
            if(await User.findOne({email})) {
                return response.status(400).send({error: 'User already exists'})
            }
            const user = await User.create(request.body)

            user.password = undefined

            return response.json(user)

        } catch (error) {
            
            return response.status(400).send({error: 'Registration failed'})

        }
    }

    public async authenticate(request: Request, response: Response) {
        const {email, password} = request.body

        const user = await User.findOne({email}).select('+password')

        if(!user){
            return response.status(400).send({error: 'User not found'})
        }

        if(!await compare(password, user.password)) {
            return response.status(400).send({error: 'Invalid password'})
        }

        user.password = undefined

        response.json(user)
    }
}

export default new UserController()