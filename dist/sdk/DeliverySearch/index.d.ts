import Assets from "./Assets";
import Categories from "./Categories";
import ContentItems from "./ContentItems";
import ContentTypes from "./ContentTypes";
import AppConfig from "../../common/AppConfig";
/**
 * Class DeliverySearch provides four types of data for searching and filtering
 */
export default class DeliverySearch {
    private config;
    /**
     * Create a DeliverySearch
     * @param config - The AppConfig object
     */
    constructor(config: AppConfig);
    /**
     * Create Assets object
     *
     * @returns Assets object
     */
    assets(): Assets;
    /**
     * Create Categories object
     *
     * @returns Categories object
     */
    categories(): Categories;
    /**
     * Create ContentItems object
     *
     * @returns ContentItems object
     */
    contentItems(): ContentItems;
    /**
     * Create ContentTypes object
     *
     * @returns ContentTypes object
     */
    contentTypes(): ContentTypes;
}
