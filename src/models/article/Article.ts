import type {ArticleLink} from "@/models/article/ArticleLink";

export interface Article extends ArticleLink {
    author: string
    createdAt: Date
    content: string
    articleParentId: number | null
}