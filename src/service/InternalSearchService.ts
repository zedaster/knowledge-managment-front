/**
 * Service to search in collections using current platform (Web JS)
 */
export class InternalSearchService {

    /**
     * Searches N elements
     * @param text a text to search
     * @param values all values
     * @param predicate predicate to get the search-needed string of a value
     * @param limit count (N) of elements to return
     */
    public search<T>(text: string, values: Iterable<T>, predicate: (f: T) => string, limit: number): Array<T> {
        const result = new Array<T>();

        let searchIterator;
        if (text === '') {
            searchIterator = values;
        } else {
            searchIterator = this.searchIteratively(text, values, predicate)
        }

        for (const foundElem of searchIterator) {
            result.push(foundElem);
            if (result.length === limit) {
                break;
            }
        }

        return result;
    }

    /**
     * Searches among values iteratively
     * @param text a text to search
     * @param values all values
     * @param predicate predicate to get the search-needed string of a value
     */
    private* searchIteratively<T>(text: string, values: Iterable<T>, predicate: (f: T) => string): Iterable<T> {
        const clearText = text.toLowerCase().trim();
        for (const value of values) {
            const textToSearch = predicate(value).trim().toLowerCase();
            if (textToSearch.includes(clearText)) {
                yield value;
            }
        }
    }
}