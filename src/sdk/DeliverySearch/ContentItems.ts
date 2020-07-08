//
// Copyright 2020 Acoustic, L.P.
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
//

import DraftRetiredDocuments from "./DraftRetiredDocuments";
import DeliverySearchHttpClient from "./DeliverySearchHttpClient";

/**
 * Class ContentItems provides filtering and searching functionality for content item data structure
 */
export default class ContentItems extends DraftRetiredDocuments {
  /**
   * Create ContentItems object
   *
   * @param httpClient - DeliverySearchHttpClient object
   */
  constructor(httpClient: DeliverySearchHttpClient) {
    super(httpClient);

    this.filterQuery(["classification:content"]);
  }

  /**
   * Change url path for protected data - mydelivery
   * @param protectedContent If it is true, to change a url path
   * @returns an object of ContentItems
   */
  public protectedContent(protectedContent: boolean): ContentItems {
    this.httpClient.isProtectedContent = protectedContent;

    return this;
  }

  /**
   * Change url path for Delivery Rendering Contexts Search
   * @param completeContentContext If it is true, to change a url path
   * @returns an object of ContentItems
   */
  public completeContentContext(completeContentContext: boolean): ContentItems {
    this.httpClient.isCompleteContentContext = completeContentContext;

    return this;
  }
}
