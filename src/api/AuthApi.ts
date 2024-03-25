import type {RegisterDto} from "@/api/dto/RegisterDto";
import type {LoginDto} from "@/api/dto/LoginDto";
import axios from "axios";
import config from "@/config/api.config"
import type {JwtTokenPair} from "@/models/JwtTokenPair";

/**
 * The class is responsible for operations with authorization and tokens
 */
export class AuthApi {
    /**
     * Key for access token in local storage
     * @private
     */
    private static readonly LS_KEY_ACCESS_TOKEN = "ACCESS_TOKEN"

    /**
     * Key for refresh token in local storage
     * @private
     */
    private static readonly LS_KEY_REFRESH_TOKEN = "REFRESH_TOKEN"

    public async register(data: RegisterDto) {
        try {
            await axios.post<string>(config.REGISTER, {
                username: data.login,
                password: data.password
            }, {
                withCredentials: false,
            });
        } catch (e: any) {
            if (e.response.status == 400) {
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
            localStorage.setItem(AuthApi.LS_KEY_ACCESS_TOKEN, tokenPair.accessToken)
            localStorage.setItem(AuthApi.LS_KEY_REFRESH_TOKEN, tokenPair.token)
        } catch (e: any) {
            if (e.response.status == 400) {
                throw e.response.data as string;
            }

            if (e.response.status == 401) {
                throw "Данные введены неверно!"
            }

            console.error('Wrong login response!')
        }
    }

    /**
     * Logs out the user
     */
    public logout() {
        localStorage.removeItem(AuthApi.LS_KEY_ACCESS_TOKEN);
        localStorage.removeItem(AuthApi.LS_KEY_REFRESH_TOKEN);
    }

    /**
     * Throws an error if the user is unauthorized
     */
    public throwIfNotAuthorized() {
        const accessToken = localStorage.getItem(AuthApi.LS_KEY_ACCESS_TOKEN);
        const refreshToken = localStorage.getItem(AuthApi.LS_KEY_REFRESH_TOKEN);

        if (!accessToken || !refreshToken) {
            throw "Unauthorized"
        }
    }

    /**
     * Refreshes access and refresh tokens
     */
    public async refreshTokenPair() {
        console.log('Refreshing tokens')
        const response = await axios.post<JwtTokenPair>(config.REFRESH_TOKEN, {
            token: localStorage.getItem(AuthApi.LS_KEY_REFRESH_TOKEN)
        }, {
            withCredentials: false,
        });

        localStorage.setItem(AuthApi.LS_KEY_ACCESS_TOKEN, response.data.accessToken)
        localStorage.setItem(AuthApi.LS_KEY_REFRESH_TOKEN, response.data.token)
    }

    /**
     * Checks is the user authorized
     */
    public isAuthorized(): boolean {
        try {
            this.throwIfNotAuthorized()
        } catch (e) {
            return false;
        }

        return true;
    }

    /**
     * Returns name of the authorized user
     */
    public getUsername() {
        this.throwIfNotAuthorized();
        const accessToken = localStorage.getItem(AuthApi.LS_KEY_ACCESS_TOKEN) as string;
        const payload = this.extractJwtData(accessToken);
        return payload.sub
    }

    /**
     * Returns payload from a JWT token
     * @param jwtToken the token
     * @private
     */
    private extractJwtData(jwtToken: string): any {
        return JSON.parse(atob(jwtToken.split('.')[1]));
    }

    /**
     * Returns value for "Authorization" HTTP request header
     */
    public getAuthorizationHeader(): string | null {
        const accessToken = localStorage.getItem(AuthApi.LS_KEY_ACCESS_TOKEN);
        if (!accessToken) {
            return null;
        }
        return "Bearer " + accessToken;
    }
}