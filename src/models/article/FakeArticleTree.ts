import type {ArticleTree} from "@/models/article/ArticleTree";
import type {ArticleLink} from "@/models/article/ArticleLink";

export class FakeArticleTree implements ArticleTree {
    get linksByLevel(): ArticleLink[][] {
        return [
            [
                this.fakeLink(1, "О компании"),
                this.fakeLink(2, "Повышение квалификации сотрудников"),
                this.fakeLink(3, "Оптимизация процессов строительства"),
                this.fakeLink(4, "Эффективное управление рисками в деятельности"),
                this.fakeLink(5, "Инновации в проектировании жилых комплексов"),
                this.fakeLink(6, "Как мы контролируем качество строительства"),
                this.fakeLink(7, "Эко-стандарты в строительстве"),
            ],
            // [
            //     this.fakeLink(8, "Роль инноваций в развитии жилищного сектора"),
            // ],
            // [
            //     this.fakeLink(10, "Эффективность управления проектами в жилищном секторе")
            // ]
        ]
    }

    get parentIds(): number[] {
        // return [5, 8];
        return [];
    }

    private fakeLink(id: number, title: string) : ArticleLink {
        return new class implements ArticleLink {
            get id(): number {
                return id
            }

            get title(): string {
                return title
            }
        }
    }

}