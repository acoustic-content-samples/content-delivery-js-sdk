import Documents from "./Documents";
/**
 * Abscract Class DraftRetiredDocuments provides functionality for searching data for preview.
 */
export default abstract class DraftRetiredDocuments extends Documents {
    /**
     * Gives an access to draft data. Includes to response items with status draft and ready
     * @param include - Include items with status draft for response, if it is true
     * @returns an object of DraftRetiredDocuments
     */
    includeDraft(include: boolean): DraftRetiredDocuments;
    /**
     * Gives an access to draft data. Includes to response items with status retired and ready
     * @param include - Include items with status retired for response, if it is true
     * @returns an object of DraftRetiredDocuments
     */
    includeRetired(include: boolean): DraftRetiredDocuments;
}
