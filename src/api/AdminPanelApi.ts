import type {PanelUser} from "@/models/user/PanelUser";

/**
 * API requests for admin panel
 */
export class AdminPanelApi {
    private users: PanelUser[] = [
        {
            id: 1,
            lastName: "Админов",
            firstName: "Админ",
            patronymic: "Адинович",
            regDate: new Date(2024, 4, 1),
            role: "admin",
        },
        {
            id: 2,
            lastName: "Писателев",
            firstName: "Писатель",
            patronymic: "Писателевич",
            regDate: new Date(2022, 8, 15),
            role: "writer",
        },
        {
            id: 3,
            lastName: "Читалкин",
            firstName: "Читатель",
            patronymic: "Читателевич",
            regDate: new Date(2023, 2, 10),
            role: "reader",
        },
        {
            id: 4,
            lastName: "Казанцев",
            firstName: "Сергей",
            patronymic: "Иванович",
            regDate: new Date(2023, 9, 10),
            role: "reader",
        },
        // Add more users with different roles here
    ];

    /**
     * Returns list of users and permissions for admin panel
     * TODO: Реальный метод с API
     */
    public async getUsers(): Promise<PanelUser[]> {
        return structuredClone(this.users)
    }

    /**
     * Saves many changed users in admin panel
     * @param changedUsers Users that was changed
     * TODO: Реальный метод с API
     */
    public async saveMany(changedUsers: Omit<PanelUser, "id" & "role">[]) {
        for (const user of changedUsers) {
            const index = this.users.findIndex((u) => u.id === user.id)
            this.users[index].role = user.role
        }
    }
}