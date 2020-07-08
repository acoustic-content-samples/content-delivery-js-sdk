import DeliverySearch from "./sdk/DeliverySearch";
import AppConfig from "./common/AppConfig";
/**
 * Class ContentDeliverySDK represents a root class of SDK. It profides an access to Delivery Search API
 */
declare class ContentDeliverySDK {
    /**
     * Create an object of ContentDeliverySDK
     * @param config - AppConfig object
     * @returns ContentDeliverySDK object
     */
    static create(config: AppConfig): ContentDeliverySDK;
    private config;
    private _deliverySearch;
    /**
     * Create ContentDeliverySDK
     * @param config  - AppConfig object
     */
    constructor(config: AppConfig);
    /**
     * Create an object of DeliverySearch
     * @returns DeliverySearch object
     */
    deliverySearch(): DeliverySearch;
}
export = ContentDeliverySDK;
