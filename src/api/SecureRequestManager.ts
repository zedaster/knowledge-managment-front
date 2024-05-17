import type {AxiosResponse} from "axios"
import axios from "axios";
import {AuthApi} from "@/api/AuthApi";
import {useUserStore} from "@/store/UserStore";
import {useRouter} from "vue-router";

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
     * Storage of user data (including accessToken)
     * @private
     */
    private readonly userStorage = useUserStore();

    private readonly router = useRouter();

    /**
     * Produces secure GET request
     * @param url URL
     */
    async get<T>(url: string): Promise<T> {
        const response = await this.produceSecureRequest(() =>
            axios.get<T>(url, {
                headers: {
                    "Authorization": this.getAuthorizationHeader()
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
                    "Authorization": this.getAuthorizationHeader()
                },
                withCredentials: false,
            })
        );
        return response.data;
    }

    /**
     * Produces secure PUT request
     * @param url URL
     * @param data Body for the PUT request
     */
    async put<T>(url: string, data: any): Promise<T> {
        const response = await this.produceSecureRequest(() =>
            axios.put<T>(url, data, {
                headers: {
                    "Authorization": this.getAuthorizationHeader()
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
                    "Authorization": this.getAuthorizationHeader()
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
        const kickUser = (reject: any) => {
            this.authApi.logout();
            this.router.push({name: 'login'});
            reject("Unauthenticated")
        }

        return new Promise((resolve, reject) => {
            if (!this.userStorage.hasUser()) {
                kickUser(reject);
                return;
            }

            requestProducer()
                .then((r) => {
                    resolve(r)
                })
                .catch(async (e) => {
                    if (!tokensRefreshed) {
                        try {
                            await this.authApi.refreshTokenPair();
                        } catch (e) {
                            kickUser(reject);
                            return
                        }
                        // when token refreshed, set true
                        const result = await this.produceSecureRequest(requestProducer, true);
                        resolve(result);
                        return
                    }
                    // when all tokens expired
                    kickUser(reject);
                });
        })
    }

    /**
     * Returns value for "Authorization" HTTP request header
     */
    private getAuthorizationHeader() {
        // @ts-ignore
        const accessToken = this.userStorage.user!.tokenPair.accessToken
        if (!accessToken) {
            return null;
        }
        return "Bearer " + accessToken;
    }
}