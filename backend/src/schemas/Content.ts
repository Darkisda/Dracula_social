import {Schema, model, Document} from 'mongoose'

interface ContentInterface extends Document {
    userRef: Schema.Types.ObjectId,
    content: String,
}

const ContentSchema = new Schema({
    userRef: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
})

export default model<ContentInterface>('Content', ContentSchema)