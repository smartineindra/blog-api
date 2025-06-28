import ArticleModel from '@/models/article.model';
import {IArticle} from "@interfaces/article.interfaces";
import {ListDto} from "@/dtos/list.dto";
import {HttpException} from "@services/exceptions/httpException";
import * as console from "node:console";

class ArticleService {
    async findAll(listDto: ListDto, filter: Partial<IArticle> = {}) {
        const {page = 1, limit = 10} = listDto;
        const skip = (listDto.page - 1) * listDto.limit;
        const [data, total] = await Promise.all([
            ArticleModel.find(filter)
                .populate('author', 'username name')
                .sort({createdAt: -1})
                .skip(skip)
                .limit(limit)
                .lean(),
            ArticleModel.countDocuments(filter),
        ]);
        return {
            data,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findById(id: string, currentUserId?: string): Promise<IArticle | null> {
        const article = await ArticleModel.findById(id).populate('author');
        if (!article) return null;

        if (article.status === 'published') return article;

        if (article.status === 'draft' && article.author._id.toString() === currentUserId) {
            return article;
        }

        return null;
    }

    async create(data: Partial<IArticle>): Promise<IArticle> {
        const article = new ArticleModel(data);
        const saved = await article.save();
        return await saved.populate('author', 'name username');
    }

    async update(id: string, data: Partial<IArticle>): Promise<IArticle | null> {
        return ArticleModel.findByIdAndUpdate(id, data, {new: true}).lean();
    }

    async delete(id: string): Promise<IArticle | null> {
        return ArticleModel.findByIdAndDelete(id).lean();
    }

    async deleteWithOwnershipCheck(articleId: string, userId: string): Promise<IArticle | null> {
        const article = await this.findById(articleId);

        if (!article) {
            throw new HttpException(404, 'Data tidak ditemukan');
        }

        if (String(article.author._id) !== String(userId)) {
            throw new HttpException(403, 'Anda tidak ada akses untuk menghapus data ini');
        }

        return ArticleModel.findByIdAndDelete(articleId).lean();
    }

    async updateWithOwnershipCheck(articleId: string, userId: string, data: Partial<IArticle>): Promise<IArticle | null> {
        const article = await this.findById(articleId);

        if (!article) {
            throw new HttpException(404, 'Data tidak ditemukan');
        }

        if (String(article.author._id) !== String(userId)) {
            throw new HttpException(403, 'Anda tidak ada akses untuk menghapus data ini');
        }

        return ArticleModel.findByIdAndUpdate(articleId, data, {new: true}).lean();
    }
}

export default new ArticleService();
