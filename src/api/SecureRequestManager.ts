import type {AxiosResponse} from "axios"
import axios from "axios";
import {AuthApi} from "@/api/AuthApi";

/**
 * Produces secure HTTP requests (with tokens from {@link AuthApi})
 */
export class SecureRequestManager {
    /**
     * Instance of {@link AuthApi}
     * @private
     */
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

    /**
     * Produces a secure request
     * @param requestProducer a function that produces a target Axios request
     * @param tokensRefreshed Internal param for recursion. If tokens are refreshed, and it's not possible to connect,
     * then the method produces logging out and rejecting.
     * @private
     */
    private async produceSecureRequest<T>(requestProducer: () => Promise<AxiosResponse<T>>,
                                          tokensRefreshed = false): Promise<AxiosResponse<T, any>> {
        this.authApi.throwIfNotAuthorized();

        return new Promise((resolve, reject) => {
            requestProducer()
                .then((r) => {
                    resolve(r)
                })
                .catch(async (e) => {
                    if (!tokensRefreshed) {
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