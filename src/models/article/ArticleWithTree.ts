import type {Article} from "@/models/article/Article";
import type {ArticleTree} from "@/models/article/ArticleTree";

export interface ArticleWithTree {
    article: Article,
    tree: ArticleTree,
}