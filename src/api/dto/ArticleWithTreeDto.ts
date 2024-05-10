import type {Article} from "@/models/article/Article";
import type {ArticleLink} from "@/models/article/ArticleLink";

export interface ArticleWithTreeDto {
    article: Article
    articleLinkBranchDto: ArticleLinkWithChildren[] | null
}

export interface ArticleLinkWithChildren {
    articleLink: ArticleLink,
    childArticles: ArticleLinkWithChildren[] | null
}