import type {Role} from "@/models/user/Role";

export type UserInfo = {
    id: number,
    lastName: string,
    firstName: string,
    patronymic: string,
    createdAt: Date,
    role: Role
}