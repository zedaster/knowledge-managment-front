/**
 * Service that works with auth tokens on local storage
 */
export class LocalTokenService {

    /**
     * Returns true if the local storage has a pair of tokens.
     * It may return true if even the pair is invalid
     */
    public hasTokenPair(): boolean {
        return false;
    }
}