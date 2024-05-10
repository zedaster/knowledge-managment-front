import type {Article} from "@/models/article/Article";
import type {ArticleLink} from "@/models/article/ArticleLink";

export interface ArticleWithChildren {
    article: Article,
    childArticles: ArticleLink[],
}