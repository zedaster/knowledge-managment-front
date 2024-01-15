import type {AxiosResponse} from "axios"
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
        const response = await this.produceSecureRequest(() =>
            axios.get<T>(url, {
                headers: {
                    "Authorization": this.authApi.getAuthorizationHeader()
                },
                withCredentials: false,
            })
        );
        return response.data;
    }

    /**
     * Produces secure POST request
     * @param url URL
     * @param data Body for the POST request
     */
    async post<T>(url: string, data: any): Promise<T> {
        const response = await this.produceSecureRequest(() =>
            axios.post<T>(url, data, {
                headers: {
                    "Authorization": this.authApi.getAuthorizationHeader()
                },
                withCredentials: false,
            })
        );
        return response.data;
    }

    /**
     * Produces secure DELETE request
     * @param url URL
     */
    async delete(url: string): Promise<void> {
        await this.produceSecureRequest(() =>
            axios.delete(url, {
                headers: {
                    "Authorization": this.authApi.getAuthorizationHeader()
                },
                withCredentials: false,
            })
        );
    }

    private async produceSecureRequest<T>(requestProducer: () => Promise<AxiosResponse<T>>,
                                          refreshed = false): Promise<AxiosResponse<T, any>> {
        this.authApi.throwIfNotAuthorized();

        try {
            return await requestProducer();
        } catch (e: any) {
            if (e.response.status === 401) {
                if (!refreshed) {
                    await this.authApi.refreshTokenPair();
                    // when token refreshed, set true
                    return this.produceSecureRequest(requestProducer, true);
                }
                // when all tokens expired
                this.authApi.logout();
                throw "Unauthenticated"
            }
            throw e
        }
    }
}