import type {ArticleVersionDto} from "@/api/dto/ArticleVersionDto";

export interface EditDataDto {
    title: string,
    content: string,
    id_version: number,
    versions: ArticleVersionDto[]
}