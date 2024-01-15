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
     */
    async get<T>(url: string): Promise<T> {
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

        return new Promise((resolve, reject) => {
            requestProducer()
                .then((r) => {
                    resolve(r)
                })
                .catch(async (e) => {
                    if (!refreshed) {
                        try {
                            await this.authApi.refreshTokenPair();
                        } catch (e) {
                            this.authApi.logout();
                            reject("Unauthenticated")
                            return
                        }
                        // when token refreshed, set true
                        const result = await this.produceSecureRequest(requestProducer, true);
                        resolve(result);
                        return
                    }
                    // when all tokens expired
                    this.authApi.logout();
                    reject("Unauthenticated")
                });
        })
    }
}