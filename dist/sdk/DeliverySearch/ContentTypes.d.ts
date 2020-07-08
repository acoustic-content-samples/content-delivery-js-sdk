import Documents from "./Documents";
import DeliverySearchHttpClient from "./DeliverySearchHttpClient";
/**
 * Class ContentTypes provides filtering and searching functionality for content type data structure
 */
export default class ContentTypes extends Documents {
    /**
     * Create ContentTypes object
     *
     * @param httpClient - DeliverySearchHttpClient object
     */
    constructor(httpClient: DeliverySearchHttpClient);
}
