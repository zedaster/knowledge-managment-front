import type {PanelUser} from "@/models/user/PanelUser";
import {SecureRequestManager} from "@/api/SecureRequestManager";
import config from "@/config/api.config";

/**
 * API requests for admin panel
 */
export class AdminPanelApi {
    /**
     * Returns list of users and permissions for admin panel
     * TODO: Реальный метод с API
     */
    public async getUsers(): Promise<PanelUser[]> {
        return new SecureRequestManager().get<PanelUser[]>(config.GET_PANEL_USERS)
    }

    /**
     * Saves many changed users in admin panel
     * @param changedUsers Users that was changed
     * TODO: Реальный метод с API
     */
    public async saveMany(changedUsers: Omit<PanelUser, "id" & "role">[]) {
        // for (const user of changedUsers) {
        //     const index = this.users.findIndex((u) => u.id === user.id)
        //     this.users[index].role = user.role
        // }
        await new SecureRequestManager().put(config.UPDATE_MANY_PANEL_USERS, changedUsers)
    }
}