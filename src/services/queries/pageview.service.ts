import PageViewModel from '@/models/pageview.model';
import {IPageView} from "@interfaces/pageview.interface";

class PageViewService {
    async findAll(page = 1, limit = 10, filter: Partial<IPageView> = {}): Promise<{ data: IPageView[]; total: number }> {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            PageViewModel.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
            PageViewModel.countDocuments(filter),
        ]);
        return { data, total };
    }

    async findById(id: string): Promise<IPageView | null> {
        return PageViewModel.findById(id).lean();
    }

    async create(data: Partial<IPageView>): Promise<IPageView> {
        const view = new PageViewModel(data);
        return view.save();
    }

    async delete(id: string): Promise<IPageView | null> {
        return PageViewModel.findByIdAndDelete(id).lean();
    }

    async countPageView(filter: any = {}) {
        return PageViewModel.countDocuments(filter);
    }
}

export default new PageViewService();
