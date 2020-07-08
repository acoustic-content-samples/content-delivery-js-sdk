import Documents from "./Documents";
import DeliverySearchHttpClient from "./DeliverySearchHttpClient";
/**
 * Class Categories provides filtering and searching functionality for category data structure
 */
export default class Categories extends Documents {
    /**
     * Create Categories object
     *
     * @param httpClient - DeliverySearchHttpClient object
     */
    constructor(httpClient: DeliverySearchHttpClient);
}
