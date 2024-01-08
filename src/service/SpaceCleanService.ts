/**
 * Service that cleans unnecessary spaces in text
 */
export class SpaceCleanService {
    /**
     * Removes beginning and ending spaces and replaces multiple spaces to single in the middle of a specific text
     * @param text The specific text
     */
    public trimAndFormatMultiSpaces(text: string): string {
        return text.trim().replace(/\s\s+/g, ' ');
    }
}