import { Request, Response } from 'express'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import {randomBytes} from 'crypto'

import User from '../schemas/User'

import { secret } from '../config/auth.json'

class UserController {

    public async index(request: Request, response: Response) {
        const users = await User.find()

        return response.json(users)
    }

    public async create(request: Request, response: Response) {

        const {email} = request.body

        try {
            if(await User.findOne({email})) {
                return response.status(400).json({error: 'User already exists'})
            }

            const user = await User.create(request.body)

            user.password = undefined

            const token = sign({id: user.id}, secret, {
                expiresIn: 86400,
            })

            return response.json({
                user,
                token
            })

        } catch (error) {
            
            return response.status(400).json({error: 'Registration failed'})

        }
    }

    public async authenticate(request: Request, response: Response) {
        const {email, password} = request.body

        const user = await User.findOne({email}).select('+password')

        if(!user){
            return response.status(400).json({error: 'User not found'})
        }

        if(!await compare(password, user.password)) {
            return response.status(400).json({error: 'Invalid password'})
        }

        user.password = undefined

        const token = sign({id: user.id}, secret, {
            expiresIn: 86400,
        })

        response.json({
            user,
            token
        })
    }

    public async forgotPassword(request: Request, response: Response) {
        const { email } = request.body

        try {
            const user = await User.findOne({email})
            
            if(!user) {
                return response.status(400).json({error: 'User not found'})
            }

            const token = randomBytes(20).toString('hex')

            const now = new Date()
            now.setHours(now.getHours() + 1)

            await User.findOneAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            })

            console.log(token, now)

        } catch (err) {
            response.status(400).json({error: 'Erro on forgot password, try again'})
        }
    }
}

export default new UserController()