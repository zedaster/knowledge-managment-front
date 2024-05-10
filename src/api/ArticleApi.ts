import type {ArticleWithTree} from "@/models/article/ArticleWithTree";
import config from "@/config/api.config"
import type {ArticleLinkWithChildren, ArticleWithTreeDto} from "@/api/dto/ArticleWithTreeDto";
import type {ArticleLink} from "@/models/article/ArticleLink";
import {SecureRequestManager} from "@/api/SecureRequestManager";
import type {ArticleTree} from "@/models/article/ArticleTree";
import type {ArticleWithChildren} from "@/models/article/ArticleWithChildren";

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
     * Requests article and full tree to the article with a specific ID
     * @param id T
     */
    public async getArticleWithTree(id: number): Promise<ArticleWithTree> {
        const url = config.GET_ARTICLE_WITH_FULL_TREE + id;
        const response = await new SecureRequestManager().get<ArticleWithTreeDto>(url)
        return this.mapToArticleWithTree(response, id);
    }

    /**
     * Requests article and its children (only one level of children) with a specific ID
     * @param id
     */
    public async getArticleWithChildren(id: number): Promise<ArticleWithChildren> {
        const url = config.GET_ARTICLE_WITH_CHILDREN + id;
        return await new SecureRequestManager().get<ArticleWithChildren>(url)
    }

    /**
     * Maps {@link ArticleWithTreeDto} to {@link ArticleWithTree}
     * @param response The response object
     * @param articleId Id of necessary article
     * @private
     */
    private mapToArticleWithTree(response: ArticleWithTreeDto, articleId: number): ArticleWithTree {
        let tree: ArticleTree = {
            linksByLevel: [],
            parentIds: []
        }

        const respArticleLinks = response.articleLinkBranchDto
        if (respArticleLinks) {
            tree = this.mapArticleTree(respArticleLinks)
        }

        return {
            article: response.article,
            tree: tree
        }
    }

    /**
     * Maps an array of {@link ArticleLinkWithChildren} to a {@link ArticleTree}
     * @param articleLinkWithChildren The object to map
     * @private
     */
    private mapArticleTree(articleLinkWithChildren: ArticleLinkWithChildren[]): ArticleTree {
        const links: ArticleLink[][] = [];
        const parentIds: number[] = [];

        let nextNode: ArticleLinkWithChildren[] | null = articleLinkWithChildren;
        let currentLevel = 0;

        while (nextNode) {
            links.push([])

            const currentNode: ArticleLinkWithChildren[] = nextNode;
            nextNode = null;

            for (const subNode of currentNode) {
                links[currentLevel].push(subNode.articleLink)
                if (subNode.childArticles && subNode.childArticles.length !== 0) {
                    nextNode = subNode.childArticles;
                    parentIds.push(subNode.articleLink.id)
                }
            }
            currentLevel++;
        }

        return {
            linksByLevel: links,
            parentIds: parentIds
        }
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
            author: 'No-name' // TODO: Убрать в API
        });
    }

    public async getTitleByArticleId(id: number) {
        const article = await this.getArticleWithTree(id);
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