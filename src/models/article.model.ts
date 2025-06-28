import { Schema, model } from 'mongoose';
import {IArticle} from "@interfaces/article.interfaces";

const articleSchema = new Schema<IArticle>(
    {
        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft',
            required: true,
        },
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: true,
    }
);

const ArticleModel = model<IArticle>('Article', articleSchema);
export default ArticleModel;
