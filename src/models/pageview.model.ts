import { Schema, model } from 'mongoose';
import { IPageView } from '@/interfaces/pageview.interface';

const pageViewSchema = new Schema<IPageView>(
    {
        article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    },
    {
        timestamps: { createdAt: true, updatedAt: false }, // hanya createdAt
    }
);

const PageViewModel = model<IPageView>('PageView', pageViewSchema);
export default PageViewModel;
