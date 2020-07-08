import Query from "../../common/Query";
import DeliverySearchHttpClient from "./DeliverySearchHttpClient";
import DeliverySearchResult from "./DeliverySearchResult";
import QueryBuilder from "./QueryBuilder";
/**
 * Class Documents represents a base class for Delivery Search data type models that are searched. It provides searching and filtering functionality for Delivery Search API.
 */
export default class Documents {
    protected isDocument: boolean;
    protected draft: boolean;
    protected retired: boolean;
    protected pageNumber: number;
    protected httpClient: DeliverySearchHttpClient;
    protected queryBuilder: QueryBuilder;
    /**
     * Create an object of Documents
     * @param httpClient - object of DeliverySearchHttpClient
     * @param query - initial Query parameters
     */
    constructor(httpClient: DeliverySearchHttpClient, query?: Query);
    /**
     * Add parameters of filters fq to a request
     * @param filterOptions { key/value } - Dictionary of filters
     * @returns an object of Documents
     */
    filterBy(filterOptions: {
        [key: string]: string;
    }): Documents;
    /**
     * Add sort field to a request
     * @param field - The title of a sort field
     * @param ascending - ascending/descending value of sort field
     * @returns an object of Documents
     */
    sortBy(field: string, ascending: boolean): Documents;
    /**
     * Add a limit of rows to a request
     * @param rows - Limit of rows
     * @returns an object of Documents
     */
    rows(rows: number): Documents;
    /**
     * Add a parameter defining an offset to a request
     * @param start defines an offset
     * @returns an object of Documents
     */
    start(start: number): Documents;
    /**
     * Add q filter to a request
     * @param text - Full text search value
     * @returns an object of Documents
     */
    searchText(text: string): Documents;
    /**
     * Add raw fq filters to a request
     * @param query - A list of filter
     * @returns an object of Documents
     */
    filterQuery(query: Array<string>): Documents;
    /**
     * Set a number of page
     * @param pageNumber - A number of page
     * @returns an object of Documents
     */
    page(pageNumber: number): Documents;
    /**
     * Set start parameter for next page
     * @returns an object of Documents
     */
    nextPage(): Documents;
    /**
     * Set start parameter for previous page
     * @returns an object of Documents
     */
    previousPage(): Documents;
    /**
     * Add filter by name to fq parameter
     * @param name - a value of name filter
     * @returns an object of Documents
     */
    filterByName(name: string): Documents;
    /**
     * Add filter by tags to fq parameter
     * @param tags Array of tags
     * @returns an object of Documents
     */
    filterByTags(tags: Array<string>): Documents;
    /**
     * Add filter by id to fq param
     * @param id a value of id filter
     * @returns an object of Documents
     */
    filterById(id: string): Documents;
    /**
     * Add filter by category to fq param
     * @param category a value of category
     * @returns an object of Documents
     */
    filterByCategory(category: string): Documents;
    /**
     * Add or remove "document" field from model of documents
     * @param isDocument include/exclude "document" field
     * @returns an object of Documents
     */
    includeDocument(isDocument: boolean): Documents;
    /**
     * Make a request using predefined filters
     * @returns Promise represents DeliverySearchResult
     */
    get(): Promise<DeliverySearchResult>;
    /**
     * Escape specific characters in filter value
     * @param source Filter value
     * @returns escaped string
     */
    escapeCharacters(source: string): string;
    /**
     * Create a query string for a Solr query
     * @returns a query string
     */
    makeQueryString(): string;
    /**
     * Make a request for logout
     * @returns Promise with a response
     */
    logout(): Promise<any>;
    /**
     * Reset options to default value
     */
    protected resetOptions(): void;
    /**
     * Add status filter based on retired and draft variables
     * @returns void
     */
    private setStatus;
}
