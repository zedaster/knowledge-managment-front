import type {ArticleLink} from "@/models/ArticleLink";

export interface ArticleTree {
    linksByLevel: ArticleLink[][],
    parentIds: number[]
}