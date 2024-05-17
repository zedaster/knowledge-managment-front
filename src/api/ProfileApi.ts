import type {UserInfo} from "@/models/user/UserInfo";
import {useUserStore} from "@/store/UserStore";
import {SecureRequestManager} from "@/api/SecureRequestManager";
import config from "@/config/api.config"

type ServerProfileInfo = Omit<UserInfo, 'id' | 'role'>

export class ProfileApi {
    /**
     * Loads information for profile page
     */
    public async loadUserInfo(): Promise<UserInfo> {
        const userStore = useUserStore()
        const cachedInfo = {
            id: userStore.user!.id,
            role: userStore.user!.group
        }
        const profileInfo = await new SecureRequestManager().get<ServerProfileInfo>(config.GET_PROFILE_INFO);
        return {...profileInfo, ...cachedInfo}
    }
}