import type {ArticleLink} from "@/models/article/ArticleLink";

export interface ArticleTree {
    linksByLevel: ArticleLink[][],
    parentIds: number[]
}