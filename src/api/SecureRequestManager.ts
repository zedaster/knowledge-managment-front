import axios from "axios";
import {AuthApi} from "@/api/AuthApi";

/**
 * Produces secure HTTP requests
 */
export class SecureRequestManager {
    private readonly authApi = new AuthApi();

    /**
     * Produces secure GET request
     * @param url URL
     * @param refreshed For internal use, stay always false
     */
    async get<T>(url: string, refreshed = false): Promise<T> {
        this.authApi.throwIfNotAuthorized();

        const response = await axios.get<T>(url, {
            auth: {
                username: 'richie',
                password: '123'
            },
            withCredentials: true,
        });

        if (response.status === 403) {
            if (!refreshed) {
                await this.authApi.refreshTokenPair();
                // when token refreshed, set true
                return this.get(url, true);
            }
            throw "Unauthenticated"
        }

        return response.data;
    }

    /**
     * Produces secure POST request
     * @param url URL
     * @param data Body for the POST request
     * @param refreshed For internal use, stay always false
     */
    async post<T>(url: string, data: any, refreshed = false): Promise<T> {
        this.authApi.throwIfNotAuthorized();

        const response = await axios.post<T>(url, data, {
            auth: {
                username: 'richie',
                password: '123'
            },
            withCredentials: true,
        });

        if (response.status === 403) {
            if (!refreshed) {
                await this.authApi.refreshTokenPair();
                // when token refreshed, set true
                return this.post(url, data, true);
            }
            throw "Unauthenticated"
        }

        return response.data;
    }
}