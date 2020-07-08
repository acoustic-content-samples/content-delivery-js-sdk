//
// Copyright 2020 Acoustic, L.P.
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
//

import Documents from "./Documents";
import DeliverySearchResponse from "./interfaces/DeliverySearchResponse";

/**
 * Class DeliverySearchResult represents a HTTP response of Delivery Search API
 */
export default class DeliverySearchResult {
  _numFound: number;
  _documents: Array<any>;
  private query: Documents;

  /**
   * Create DeliverySearchResult
   * @param res - DeliverySearchResponse object
   * @param query - Documents object
   */
  constructor(res: DeliverySearchResponse, query: Documents) {
    this.query = query;
    this._numFound = res.data.numFound || 0;
    this._documents = res.data.documents || [];
  }

  /**
   * Get the total number of documents
   *
   * @returns Number of documents
   */
  public numFound(): number {
    return this._numFound;
  }

  /**
   * Get the list of documents
   *
   * @returns The list of documents
   */
  public documents(): Array<any> {
    return this._documents;
  }

  /**
   * Get the request object for the next page.
   *
   * @returns Promise object represents DeliverySearchResult object for the next page
   */
  public nextPage(): Promise<DeliverySearchResult> {
    return this.query.nextPage().get();
  }

  /**
   * Get the request object for the previous page
   *
   * @returns Promise object represents DeliverySearchResult object for the previous page
   */
  public previousPage(): Promise<DeliverySearchResult> {
    return this.query.previousPage().get();
  }
}
