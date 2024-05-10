import type {Role} from "@/models/user/Role";

/**
 * Information about user that is shown on the admin page
 */
export interface PanelUser {
    id: number,
    lastName: string,
    firstName: string,
    patronymic: string,
    regDate: Date,
    role: Role,
}