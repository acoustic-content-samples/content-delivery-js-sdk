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

import DeliverySearch from "../../src/sdk/DeliverySearch";
import Assets from "../../src/sdk/DeliverySearch/Assets";
import Categories from "../../src/sdk/DeliverySearch/Categories";
import ContentItems from "../../src/sdk/DeliverySearch/ContentItems";
import ContentTypes from "../../src/sdk/DeliverySearch/ContentTypes";

const config = { apiUrl: "" };

describe("DeliverySearch", () => {
  it("DeliverySearch.assets", () => {
    const deliverySearch = new DeliverySearch(config);

    assert.instanceOf(deliverySearch.assets(), Assets);
  });

  it("DeliverySearch.categories", () => {
    const deliverySearch = new DeliverySearch(config);

    assert.instanceOf(deliverySearch.categories(), Categories);
  });

  it("DeliverySearch.contentItems", () => {
    const deliverySearch = new DeliverySearch(config);

    assert.instanceOf(deliverySearch.contentItems(), ContentItems);
  });

  it("DeliverySearch.ContentTypes", () => {
    const deliverySearch = new DeliverySearch(config);

    assert.instanceOf(deliverySearch.contentTypes(), ContentTypes);
  });
});
