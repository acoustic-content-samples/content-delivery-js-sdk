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
import Categories from "../../src/sdk/DeliverySearch/Categories";
import DeliverySearchHttpClient from "../../src/sdk/DeliverySearch/DeliverySearchHttpClient";

class CategoriesTest extends Categories {
  getQuery() {
    return this.queryBuilder.getQueryObject();
  }
}

describe("Categories", () => {
  let categories: CategoriesTest = null;

  beforeEach(() => {
    const httpClient: DeliverySearchHttpClient = new DeliverySearchHttpClient(
      config
    );

    categories = new CategoriesTest(httpClient);
  });

  describe("Categories.constructor", () => {
    it("should have default classification filter", () => {
      const fq = categories.getQuery().fq;

      assert.lengthOf(fq, 1);
      assert.sameDeepOrderedMembers(fq, ["classification:category"]);
    });
  });
});
