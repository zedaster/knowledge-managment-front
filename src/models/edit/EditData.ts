import type {ArticleVersion} from "@/models/edit/ArticleVersion";

export interface EditData {
    title: string,
    content: string,
    versions: ArticleVersion[],
    currentVersion: number
}