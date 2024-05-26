import type {RegisterDto} from "@/api/dto/RegisterDto";
import type {LoginDto} from "@/api/dto/LoginDto";
import axios from "axios";
import config from "@/config/api.config"
import type {JwtTokenPair} from "@/models/JwtTokenPair";
import {useUserStore} from "@/store/UserStore";
import type {User} from "@/models/user/User";

/**
 * The class is responsible for operations with authorization and tokens
 */
export class AuthApi {
    /**
     * Storage with user data
     * @private
     */
    private readonly userStorage = useUserStore();

    public async register(data: RegisterDto) {
        // TODO: Синхронизировать поля с Эрнестом
        // TODO: Отчество null или пустую строку?
        try {
            await axios.post<string>(config.REGISTER, {
                username: data.login,
                password: data.password
            }, {
                withCredentials: false,
            });
        } catch (e: any) {
            if (e.response && e.response.status == 400) {
                throw e.response.data;
            }
            console.error('Wrong register response!')
        }


    }

    public async login(data: LoginDto) {
        try {
            const response = await axios.post<JwtTokenPair | string>(
                config.LOGIN,
                data, {
                    withCredentials: false,
                });

            const tokenPair = response.data as JwtTokenPair;
            const user = this.extractUser(tokenPair);
            this.userStorage.updateUser(user);
        } catch (e: any) {
            if (e.response && e.response.status == 400) {
                throw e.response.data as string;
            }

            if (e.response && e.response.status == 401) {
                throw "Данные введены неверно!"
            }

            console.error('Wrong login response!', e)
        }
    }

    /**
     * Logs out the user
     */
    public logout() {
        this.userStorage.clearUser()
    }

    /**
     * Refreshes access and refresh tokens
     */
    public async refreshTokenPair() {
        const response = await axios.post<JwtTokenPair>(config.REFRESH_TOKEN, {
            token: this.userStorage.user!.tokenPair.token
        }, {
            withCredentials: false,
        });

        const jwtPair = response.data as JwtTokenPair
        this.userStorage.updateUserTokenPair(jwtPair)
    }

    /**
     * Extracts user from its token pair
     * @param tokenPair Token pair
     * @private
     */
    private extractUser(tokenPair: JwtTokenPair): User {
        const payload = this.extractJwtPayload(tokenPair.accessToken);
        return {
            tokenPair: tokenPair,
            name: payload.sub,
            id: payload.id,
            group: payload.group
        }
    }

    /**
     * Extracts payload from a JWT token
     * @param jwtToken JWT token
     * @private
     */
    private extractJwtPayload(jwtToken: string): any {
        return JSON.parse(atob(jwtToken.split('.')[1]));
    }
}