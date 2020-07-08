//
// Copyright 2020 Acoustic, L.P.
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
//

import DeliverySearch from "./sdk/DeliverySearch";
import AppConfig from "./common/AppConfig";

/**
 * Class ContentDeliverySDK represents a root class of SDK. It profides an access to Delivery Search API
 */
class ContentDeliverySDK {
  /**
   * Create an object of ContentDeliverySDK
   * @param config - AppConfig object
   * @returns ContentDeliverySDK object
   */
  static create(config: AppConfig): ContentDeliverySDK {
    return new ContentDeliverySDK(config);
  }
  private config: AppConfig;
  private _deliverySearch: DeliverySearch;

  /**
   * Create ContentDeliverySDK
   * @param config  - AppConfig object
   */
  constructor(config: AppConfig) {
    this.config = { ...config };
    this._deliverySearch = new DeliverySearch(this.config);
  }

  /**
   * Create an object of DeliverySearch
   * @returns DeliverySearch object
   */
  public deliverySearch(): DeliverySearch {
    return this._deliverySearch;
  }
}

export = ContentDeliverySDK;
