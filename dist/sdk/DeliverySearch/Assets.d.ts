import DeliverySearchHttpClient from "./DeliverySearchHttpClient";
import DraftRetiredDocuments from "./DraftRetiredDocuments";
/**
 * Class Assets provides filtering and searching functionality for asset data structure
 */
export default class Assets extends DraftRetiredDocuments {
    /**
     * Create Assets object
     *
     * @param httpClient - DeliverySearchHttpClient object
     */
    constructor(httpClient: DeliverySearchHttpClient);
}
