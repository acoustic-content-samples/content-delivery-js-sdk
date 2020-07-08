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

/**
 * Abscract Class DraftRetiredDocuments provides functionality for searching data for preview.
 */
export default abstract class DraftRetiredDocuments extends Documents {
  /**
   * Gives an access to draft data. Includes to response items with status draft and ready
   * @param include - Include items with status draft for response, if it is true
   * @returns an object of DraftRetiredDocuments
   */
  public includeDraft(include: boolean): DraftRetiredDocuments {
    this.draft = include;
    this.httpClient.isPreview = this.draft || this.retired;

    return this;
  }

  /**
   * Gives an access to draft data. Includes to response items with status retired and ready
   * @param include - Include items with status retired for response, if it is true
   * @returns an object of DraftRetiredDocuments
   */
  public includeRetired(include: boolean): DraftRetiredDocuments {
    this.retired = include;
    this.httpClient.isPreview = this.draft || this.retired;

    return this;
  }
}
