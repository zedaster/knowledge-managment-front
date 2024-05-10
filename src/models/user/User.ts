import type {JwtTokenPair} from "@/models/JwtTokenPair";

/**
 * Model of the current user
 */
export interface User {
    name: string,
    tokenPair: JwtTokenPair,
    group: string
}