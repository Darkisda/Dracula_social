import { Schema, model, Document } from 'mongoose'

interface UserInterface extends Document {
    email?: string,
    firstName?: string,
    lastName?: string,
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

UserSchema.methods.fullName = function():string {
    return this.firstName + ' ' + this.lastName
}

export default model<UserInterface>('User', UserSchema)