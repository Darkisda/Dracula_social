import {Schema, model, Document} from 'mongoose'

interface TextInterface extends Document {
    userRef: Schema.Types.ObjectId,
    text: String,
}

const TextSchema = new Schema({
    userRef: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
})

export default model<TextInterface>('Text', TextSchema)