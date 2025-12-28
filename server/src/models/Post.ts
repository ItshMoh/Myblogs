import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
    content: string;
    timestamp: Date;
    userId: string;
    userName: string;
}

const PostSchema: Schema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
        required: true,
        default: 'mohan'
    },
    userName: {
        type: String,
        required: true,
        default: 'mohan'
    }
});

export default mongoose.model<IPost>('Post', PostSchema);
