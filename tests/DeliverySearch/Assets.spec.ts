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
import Assets from "../../src/sdk/DeliverySearch/Assets";
import DeliverySearchHttpClient from "../../src/sdk/DeliverySearch/DeliverySearchHttpClient";

class AssetsTest extends Assets {
  getQuery() {
    return this.queryBuilder.getQueryObject();
  }

  getDraft() {
    return this.draft;
  }

  getRetired() {
    return this.retired;
  }
}

describe("Assets", () => {
  let assets: AssetsTest = null;

  beforeEach(() => {
    const httpClient: DeliverySearchHttpClient = new DeliverySearchHttpClient(
      config
    );

    assets = new AssetsTest(httpClient);
  });

  describe("Assets.constructor", () => {
    it("should have default classification filter", () => {
      const fq = assets.getQuery().fq;

      assert.lengthOf(fq, 1);
      assert.sameDeepOrderedMembers(fq, ["classification:asset"]);
    });
  });

  describe("Assets.includeDraft", () => {
    it("default value should be false", () => {
      assert.equal(assets.getDraft(), false);
    });

    it("should set includeDraft to true", () => {
      assets.includeDraft(true);

      assert.equal(assets.getDraft(), true);
    });
  });

  describe("Assets.includeRetired", () => {
    it("default value should be false", () => {
      assert.equal(assets.getRetired(), false);
    });

    it("should set includeRetired to true", () => {
      assets.includeRetired(true);

      assert.equal(assets.getRetired(), true);
    });
  });

  describe("Assets.includeRetired and Assets.includeDraft", () => {
    it("should set retired to true and draft is false", () => {
      assets.includeDraft(true);
      assets.includeRetired(true);
      assets.includeDraft(false);

      assert.equal(assets.getRetired(), true);
      assert.equal(assets.getDraft(), false);
    });
  });
});
