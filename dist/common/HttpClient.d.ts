export default class HttpClient {
    /**
     * Make HTTP GET request
     * @param url - the server URL that will be used for the request
     * @param params - the URL parameters to be sent with the request
     * @param config - config options for making requests
     * @returns Promise object represents a response
     */
    get(url: string, params?: URLSearchParams, config?: any): Promise<any>;
    /**
     * Make HTTP POST request
     * @param url - the server URL that will be used for the request
     * @param params - the URL parameters to be sent with the request
     * @returns Promise object represents a response
     */
    post(url: string, params?: URLSearchParams): Promise<any>;
}
