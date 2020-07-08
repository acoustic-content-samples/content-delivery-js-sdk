//
// Copyright 2020 Acoustic, L.P.
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
//

import Assets from "./Assets";
import Categories from "./Categories";
import ContentItems from "./ContentItems";
import ContentTypes from "./ContentTypes";
import DeliverySearchHttpClient from "./DeliverySearchHttpClient";
import AppConfig from "../../common/AppConfig";

/**
 * Class DeliverySearch provides four types of data for searching and filtering
 */
export default class DeliverySearch {
  private config: AppConfig;

  /**
   * Create a DeliverySearch
   * @param config - The AppConfig object
   */
  constructor(config: AppConfig) {
    this.config = config;
  }

  /**
   * Create Assets object
   *
   * @returns Assets object
   */
  public assets(): Assets {
    return new Assets(new DeliverySearchHttpClient(this.config));
  }

  /**
   * Create Categories object
   *
   * @returns Categories object
   */
  public categories(): Categories {
    return new Categories(new DeliverySearchHttpClient(this.config));
  }

  /**
   * Create ContentItems object
   *
   * @returns ContentItems object
   */
  public contentItems(): ContentItems {
    return new ContentItems(new DeliverySearchHttpClient(this.config));
  }

  /**
   * Create ContentTypes object
   *
   * @returns ContentTypes object
   */
  public contentTypes(): ContentTypes {
    return new ContentTypes(new DeliverySearchHttpClient(this.config));
  }
}
