import { Schema, model, Document } from 'mongoose'

interface PostInterface extends Document {
    userRef: Schema.Types.ObjectId,
    text?: Schema.Types.ObjectId,
    contents?: Array<Schema.Types.ObjectId>,
    date: Date,
    meta: [String, Number],
}

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: Schema.Types.ObjectId,
        ref: 'Text',
        required: false,
    },
    contents: [{
        type: Schema.Types.ObjectId,
        ref: 'Content',
        required: false,
    }],
    date: {
        type: Date,
        default: Date.now,
    },
    meta: {
        likes: {
            type: Number,
            default: 0
        },
        coments: {
            type: String,
            default: 0,
        }
    }
}, {
    timestamps: true,
})

export default model<PostInterface>('Post', PostSchema)