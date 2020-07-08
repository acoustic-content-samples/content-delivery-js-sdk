import HttpClient from "../../common/HttpClient";
import AppConfig from "../../common/AppConfig";
import LoginResponse from "./interfaces/LoginResponse";
/**
 * Class DeliverySearchHttpClient provides functionality of creating HTTP requests for Delivery Search API
 */
export default class DeliverySearchHttpClient extends HttpClient {
    isProtectedContent: boolean;
    isCompleteContentContext: boolean;
    isPreview: boolean;
    private config;
    private isLoggedIn;
    /**
     * Creates a DeliverySearchHttpClient
     * @param config - The AppConfig object
     */
    constructor(config: AppConfig);
    /**
     * Change a subdomain to preview for url
     *
     * @param value current url
     * @returns morified url
     */
    makePreview(value: string): string;
    /**
     * Creates http config for a http request
     *
     * @returns Object represents http config
     */
    getHttpConfig(): any;
    /**
     * Makes HTTP request with GET method
     * @param queryString
     *
     * @returns Promise object represents the result of HTTP request
     */
    get(queryString: string): Promise<any>;
    /**
     * Makes a request for login
     * @param username
     * @param password
     *
     * @returns Promise object represents the result of authentication
     */
    login(username: string, password: string): Promise<Array<LoginResponse>>;
    /**
     * Make a request for logout
     * @returns Promise with a response
     */
    logout(): Promise<any>;
    /**
     * Create url for search request based on current settings
     *
     * @returns url for search request
     */
    protected getSearchUrl(): string;
}
