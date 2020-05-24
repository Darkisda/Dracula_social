import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { promisify } from 'util'

import {secret} from '../config/auth.json'

class Auth {
    public async auth(request: Request, response: Response, next: NextFunction) {
        
        const authHeader = request.headers.authorization

        if(!authHeader) {
            return response.status(400).json({ error: 'No token provided' })
        }

        const parts = authHeader.split(' ')

        if(parts.length !== 2) {
            return response.status(401).json({ error: 'Token error' })
        }

        const [ scheme, token ] = parts

        if(!/^Bearer$^/i.test(scheme)){
            return response.status(401).json({ error: 'Token malformatted' })
        }

        verify(token, secret, (err)=> {
            if(err) {
                return response.status(401).send({error: 'Token Invalid'})
            }

            return next()
        })
    }
}

export default new Auth()