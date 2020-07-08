//
// Copyright 2020 Acoustic, L.P.
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
//

import { assert, expect } from "chai";
import * as sinon from "sinon";

const config = { apiUrl: "" };
import ContentItems from "../../src/sdk/DeliverySearch/ContentItems";
import DeliverySearchHttpClient from "../../src/sdk/DeliverySearch/DeliverySearchHttpClient";

class ContentItemsTest extends ContentItems {
  getQuery() {
    return this.queryBuilder.getQueryObject();
  }

  getIsProtectedContent() {
    return this.httpClient.isProtectedContent;
  }

  getIsCompleteContentContext() {
    return this.httpClient.isCompleteContentContext;
  }

  getDraft() {
    return this.draft;
  }

  getRetired() {
    return this.retired;
  }
}

describe("ContentItems", () => {
  let contentItems: ContentItemsTest = null;

  beforeEach(() => {
    const httpClient: DeliverySearchHttpClient = new DeliverySearchHttpClient(
      config
    );

    contentItems = new ContentItemsTest(httpClient);
  });

  describe("ContentItems.constructor", () => {
    it("should have default classification filter", () => {
      const fq = contentItems.getQuery().fq;

      assert.lengthOf(fq, 1);
      assert.sameDeepOrderedMembers(fq, ["classification:content"]);
    });
  });

  describe("ContentItems.protectedContent", () => {
    it("default value should be false", () => {
      assert.equal(contentItems.getIsProtectedContent(), false);
    });

    it("should set isProtectedContent to true", () => {
      contentItems.protectedContent(true);

      assert.equal(contentItems.getIsProtectedContent(), true);
    });
  });

  describe("ContentItems.completeContentContext", () => {
    it("default value should be false", () => {
      assert.equal(contentItems.getIsCompleteContentContext(), false);
    });

    it("should set completeContentContext to true", () => {
      contentItems.completeContentContext(true);

      assert.equal(contentItems.getIsCompleteContentContext(), true);
    });
  });

  describe("ContentItems.includeDraft", () => {
    it("default value should be false", () => {
      assert.equal(contentItems.getDraft(), false);
    });

    it("should set includeDraft to true", () => {
      contentItems.includeDraft(true);

      assert.equal(contentItems.getDraft(), true);
    });
  });

  describe("ContentItems.includeRetired", () => {
    it("default value should be false", () => {
      assert.equal(contentItems.getRetired(), false);
    });

    it("should set includeRetired to true", () => {
      contentItems.includeRetired(true);

      assert.equal(contentItems.getRetired(), true);
    });
  });
});
