import type {UserInfo} from "@/models/user/UserInfo";
import {useUserStore} from "@/store/UserStore";

export class ProfileApi {
    /**
     * Loads information for profile page
     */
    public async loadUserInfo(): Promise<UserInfo> {
        const userStore = useUserStore()
        return {
            id: 1,
            lastName: "Казанцев",
            firstName: "Сергей",
            patronymic: "Иванович",
            createdAt: new Date(2023, 9, 10),
            role: userStore.user!.group
        }
    }
}