import type {Article} from "@/models/Article";

export class FakeArticles {
    private readonly articles : Article[]  = [
        {
            author: 'Петр Брусников',
            createdAt: new Date(2022, 6, 20),
            id: 1,
            title: "О компании",
            content: "<p>Брусника — российская девелоперская компания. Специализируется на строительстве жилых " +
                "многоэтажных домов. Основана в 2004 году. Штаб-квартира находится в Екатеринбурге. Сегодня " +
                "Брусника строит современное демократичное жильё в крупных городах Урала и Сибири, в Москве " +
                "и Московской области. Ежегодно это 7 000 новых квартир для российских семей.</p>" +
                "<p>Бизнес-идея Брусники основана на желании изменить жизнь к лучшему, предлагая " +
                "демократичное жильё нового качества, простоту и надёжность покупки, комфорт и " +
                "функциональность проживания.</p>" +
                "<p>В Бруснике понимают девелопмент как постоянный процесс преобразования города и " +
                "пространства, в котором живут люди. Для компании важны детали, которые могут сделать жизнь " +
                "лучше. Для сотрудников Брусники это ежедневный добросовестный труд.</p>" +
                "<p>В долгосрочных планах компания нацелена на укрепление лидерских позиций по качеству " +
                "строительства и репутации среди покупателей. Брусника развивает внутренние научно-" +
                "исследовательские и опытно-конструкторские разработки в области новых материалов, " +
                "современных гибких производств, цифровых методов управления стройкой.</p>",
            articleParentId: null
        },
        {
            author: 'Петр Брусников',
            createdAt: new Date(2022, 6, 20),
            id: 2,
            title: "Повышение квалификации сотрудников",
            content: "<p>Наполнение статьи Повышение квалификации сотрудников</p>",
            articleParentId: null
        },
        {
            author: 'Петр Брусников',
            createdAt: new Date(2022, 6, 20),
            id: 3,
            title: "Оптимизация процессов строительства",
            content: "<p>Наполнение статьи Оптимизация процессов строительства</p>",
            articleParentId: null
        },
        {
            author: 'Петр Брусников',
            createdAt: new Date(2022, 6, 20),
            id: 4,
            title: "Эффективное управление рисками в деятельности",
            content: "<p>Наполнение статьи Эффективное управление рисками в деятельности</p>",
            articleParentId: null
        },
        {
            author: 'Петр Брусников',
            createdAt: new Date(2022, 6, 20),
            id: 5,
            title: "Инновации в проектировании жилых комплексов",
            content: "<p>Наполнение статьи Инновации в проектировании жилых комплексов</p>",
            articleParentId: null
        },
        {
            author: 'Петр Брусников',
            createdAt: new Date(2022, 6, 20),
            id: 8,
            title: "Роль инноваций в развитии жилищного сектора",
            content: "<p>Наполнение статьи Роль инноваций в развитии жилищного сектора</p>",
            articleParentId: 5
        },
        {
            author: 'Петр Брусников',
            createdAt: new Date(2022, 6, 20),
            id: 10,
            title: "Эффективность управления проектами в жилищном секторе",
            content: "<p>Наполнение статьи Эффективность управления проектами в жилищном секторе</p>",
            articleParentId: 8
        }
    ]

    public getArticleById(id: number) {
        return this.articles.filter(a => a.id == id)[0];
    }
}