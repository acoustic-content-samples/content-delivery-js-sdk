import Documents from "./Documents";
import DeliverySearchResponse from "./interfaces/DeliverySearchResponse";
/**
 * Class DeliverySearchResult represents a HTTP response of Delivery Search API
 */
export default class DeliverySearchResult {
    _numFound: number;
    _documents: Array<any>;
    private query;
    /**
     * Create DeliverySearchResult
     * @param res - DeliverySearchResponse object
     * @param query - Documents object
     */
    constructor(res: DeliverySearchResponse, query: Documents);
    /**
     * Get the total number of documents
     *
     * @returns Number of documents
     */
    numFound(): number;
    /**
     * Get the list of documents
     *
     * @returns The list of documents
     */
    documents(): Array<any>;
    /**
     * Get the request object for the next page.
     *
     * @returns Promise object represents DeliverySearchResult object for the next page
     */
    nextPage(): Promise<DeliverySearchResult>;
    /**
     * Get the request object for the previous page
     *
     * @returns Promise object represents DeliverySearchResult object for the previous page
     */
    previousPage(): Promise<DeliverySearchResult>;
}
