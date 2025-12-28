import mongoose, { Document, Schema } from 'mongoose';

export interface IArticle extends Document {
    title: string;
    content: string;
    timestamp: Date;
    author: string;
    wordCount: number;
}

const ArticleSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: true,
        default: 'mohan'
    },
    wordCount: {
        type: Number,
        default: 0
    }
});

export default mongoose.model<IArticle>('Article', ArticleSchema);
