import DraftRetiredDocuments from "./DraftRetiredDocuments";
import DeliverySearchHttpClient from "./DeliverySearchHttpClient";
/**
 * Class ContentItems provides filtering and searching functionality for content item data structure
 */
export default class ContentItems extends DraftRetiredDocuments {
    /**
     * Create ContentItems object
     *
     * @param httpClient - DeliverySearchHttpClient object
     */
    constructor(httpClient: DeliverySearchHttpClient);
    /**
     * Change url path for protected data - mydelivery
     * @param protectedContent If it is true, to change a url path
     * @returns an object of ContentItems
     */
    protectedContent(protectedContent: boolean): ContentItems;
    /**
     * Change url path for Delivery Rendering Contexts Search
     * @param completeContentContext If it is true, to change a url path
     * @returns an object of ContentItems
     */
    completeContentContext(completeContentContext: boolean): ContentItems;
}
