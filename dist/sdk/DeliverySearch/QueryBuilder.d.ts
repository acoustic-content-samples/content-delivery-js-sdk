import Query from "../../common/Query";
import FilterItem from "../../common/FilterItem";
/**
 * Class QueryBuilder provides functionality for creating query string for Solr
 */
export default class QueryBuilder {
    private query;
    /**
     * Create QueryBuilder object
     * @param query initial data
     */
    constructor(query?: Query);
    /**
     * Get an access to query parameters
     * @returns query data
     */
    getQueryObject(): Query;
    /**
     * Add a filter to fq parameter
     * @param field name of filter
     * @param value value of filter
     */
    addFq(field: string, value: string): void;
    /**
     * Add a raw filter to fq parameter without encoding
     * Example of value: "status:ready AND isManaged:false"
     *
     * @param field name of filter
     * @param value value of filter
     */
    addRawFq(value: string): void;
    /**
     * Add a multi filter to fq parameter
     * Example of items: [{ field: "status", value: "ready" }, { field: "isManaged", value: "false" }]
     * Result: "status:ready AND isManaged:false"
     *
     * @param items array of FilterItem objects
     * @param operation logical operation
     */
    addMultiFq(items: Array<FilterItem>, operation?: string): void;
    /**
     * Add sorting field to the query
     * @param field name of sort field
     * @param ascending ascending/descending order
     */
    addSort(field: string, ascending: boolean): void;
    /**
     * Add a limit of rows to a query
     * @param rows Limit of rows
     */
    addRows(rows: number): void;
    /**
     * Add a parameter defining an offset to a query
     * @param start defines an offset
     */
    addStart(start: number): void;
    /**
     * Add a filter to q parameter
     * @param query filter of q parameter
     */
    addQ(query: string): void;
    /**
     * Reset q parameter of query
     */
    cleanQ(): void;
    /**
     * Make query string for Solr request based on query parameters
     * @returns query string
     */
    makeQueryString(): string;
}
