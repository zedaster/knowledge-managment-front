import type {Article} from "@/models/article/Article";

export interface ArticleWithTreeResponse {
    article: Article
    childArticles: ArticleWithTreeResponse[] | null
}