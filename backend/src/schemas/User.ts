import { Schema, model, Document } from 'mongoose'
import { hash } from 'bcryptjs'

interface UserInterface extends Document {
    email: string,
    firstName: string,
    lastName?: string,
    password: string,
    fullName(): string,
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
        select: false,
    }
}, {
    timestamps: true
})

UserSchema.pre<UserInterface>('save', async function(next){
    const hashPassword = await hash(this.password, 10)
    
    this.password = hashPassword

    next()
})

UserSchema.methods.fullName = function():string {
    return this.firstName + ' ' + this.lastName
}

export default model<UserInterface>('User', UserSchema)