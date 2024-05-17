import type {JwtTokenPair} from "@/models/JwtTokenPair";
import type {Role} from "@/models/user/Role";

/**
 * Model of the current user
 */
export interface User {
    name: string,
    tokenPair: JwtTokenPair,
    id: number
    group: Role
}