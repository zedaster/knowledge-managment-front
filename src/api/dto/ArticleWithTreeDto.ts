import type {Article} from "@/models/article/Article";

export interface ArticleWithTreeDto {
    article: Article
    childArticles: ArticleWithTreeDto[] | null
}