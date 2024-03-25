import type {ArticleWithTree} from "@/models/article/ArticleWithTree";
import config from "@/config/api.config"
import type {ArticleWithTreeDto} from "@/api/dto/ArticleWithTreeDto";
import type {ArticleLink} from "@/models/article/ArticleLink";
import type {Article} from "@/models/article/Article";
import {SecureRequestManager} from "@/api/SecureRequestManager";
import type {ArticleTree} from "@/models/article/ArticleTree";

/**
 * API manager for articles
 */
export class ArticleApi {

    /**
     * Request root tree of articles
     */
    public async getRootTree(): Promise<ArticleTree> {
        const rootLinkArray = await new SecureRequestManager().get<ArticleLink[]>(config.GET_ROOT_TREE);
        return {
            linksByLevel: [rootLinkArray],
            parentIds: []
        };
    }

    /**
     * Requests article (including tree) with a specific ID
     * @param id T
     */
    public async getArticleWithTreeById(id: number): Promise<ArticleWithTree> {
        const url = config.GET_SINGLE_ARTICLE + id;
        const response = await new SecureRequestManager().get<ArticleWithTreeDto[]>(url)
        return this.mapToArticleWithTree(response, id);
    }

    /**
     * Maps {@link ArticleWithTreeDto} to {@link ArticleWithTree}
     * @param response The response object
     * @param articleId Id of necessary article
     * @private
     */
    private mapToArticleWithTree(response: ArticleWithTreeDto[], articleId: number): ArticleWithTree {
        const links: ArticleLink[][] = [[]];
        const parentIds: number[] = [];

        let activeNode = response as ArticleWithTreeDto[] | null
        let nextNode: ArticleWithTreeDto[] | null = null
        let activeLevel = 0;
        let article = null as null | Article;
        while (activeNode !== null) {
            for (const articleNode of activeNode) {
                links[activeLevel].push({
                    id: articleNode.article.id,
                    title: articleNode.article.title
                });
                if (articleNode.article.id === articleId) {
                    article = articleNode.article
                }
                if (articleNode.childArticles && articleNode.childArticles.length > 0) {
                    nextNode = articleNode.childArticles
                    parentIds.push(articleNode.article.id)
                }
            }

            activeNode = nextNode
            nextNode = null
            activeLevel += 1
            links.push([])
        }

        return {
            article: article!,
            tree: {
                linksByLevel: links,
                parentIds: parentIds
            }
        };
    }

    /**
     * Creates article
     * @param newArticle params for the new article
     */
    public async createArticle(newArticle: { title: string; content: string; parentId: number | null }) {
        await new SecureRequestManager().post(config.CREATE_ARTICLE, {
            title: newArticle.title,
            content: newArticle.content,
            articleParentId: newArticle.parentId,
            author: 'Sergey' // TODO: Убрать
        });
    }

    public async getTitleByArticleId(id: number) {
        const article = await this.getArticleWithTreeById(id);
        return article.article.title;
    }

    /**
     * Removes article with a specified ID
     * @param id The specified id
     */
    public async removeById(id: number) {
        await new SecureRequestManager().delete(config.DELETE_ARTICLE + id);
    }
}