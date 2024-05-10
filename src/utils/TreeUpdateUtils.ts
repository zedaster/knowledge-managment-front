import type {ArticleTree} from "@/models/article/ArticleTree";
import type {ArticleLink} from "@/models/article/ArticleLink";

/**
 * Util to get an updated tree
 */
export class TreeUpdateUtils {
    /**
     * Returns a duplicated tree, but appends children to specified article and removes useless links
     * @param currentTree Current tree
     * @param articleId Id of the article
     * @param children Children to append
     */
    getUpdatedTree(currentTree: ArticleTree, articleId: number, children: ArticleLink[]): ArticleTree {
        const newTree: ArticleTree = {
            linksByLevel: [],
            parentIds: [],
        }

        const articleLevel = this.getArticleTreeLevel(currentTree, articleId);
        for (let i = 0; i <= articleLevel; i++) {
            newTree.linksByLevel.push(currentTree.linksByLevel[i])
            if (i !== 0) {
                newTree.parentIds.push(currentTree.parentIds[i - 1]);
            }
        }
        newTree.linksByLevel.push(children)
        newTree.parentIds.push(articleId)
        return newTree;
    }

    /**
     * Returns level of the article in the tree
     * @param tree The tree
     * @param articleId The article
     * @private
     */
    private getArticleTreeLevel(tree: ArticleTree, articleId: number): number {
        const treeLevelCount = tree.linksByLevel.length;

        for (let i = 0; i < treeLevelCount; i++) {
            const links = tree.linksByLevel[i];
            const ids = links.map(link => link.id)
            if (ids.includes(articleId)) {
                return i;
            }
        }

        throw "There is no such article in the tree! (debug TreeUpdateUtils.getArticleTreeLevel)"
    }
}