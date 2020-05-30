import {Request, Response} from 'express'

import Post from '../schemas/Post'
import Text from '../schemas/Text'
import Content from '../schemas/Content'

class PostController {
    
    public async index(request:Request, response: Response) {
        return response.json(request.userId)
    }

    public async onePost(request: Request, response: Response) {
        const postId = request.params

        return response.json(postId)
    }

    public async create(request: Request, response: Response) {
        const {text, content} = request.body

        try {

            const textPost =  await Text.create(text)
            const contentPost = await Content.create(content)

            console.log(textPost)
            console.log(contentPost)

            const post = await Post.create(textPost, contentPost)

            return response.json(post)
            
        } catch (err) {

            return response.status(400).json({error: 'Error create new post' })

        }
    }

    public async update(request: Request, response: Response) {
        return response.json({message: "update post page"})
    }

    public async delete(request: Request, response: Response) {
        return response.json({message: "delete post page"})
    }

}

export default new PostController()