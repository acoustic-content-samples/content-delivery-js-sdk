//
// Copyright 2020 Acoustic, L.P.
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
//

import { assert } from "chai";
import ContentDeliverySDK = require("../src");
import DeliverySearch from "./../src/sdk/DeliverySearch";

const config = {
  apiUrl: process.env.API_URL || "",
  username: process.env.USERNAME || "",
  password: process.env.PASSWORD || "",
};

describe("ContentDeliverySDK", () => {
  it("ContentDeliverySDK.create should return an instance of ContentDeliverySDK", () => {
    const client = ContentDeliverySDK.create(config);

    assert.instanceOf(client, ContentDeliverySDK);
  });

  it("ContentDeliverySDK.deliverySearch should return an instance of DeliverySearch", () => {
    const client = ContentDeliverySDK.create(config);
    const ds = client.deliverySearch();

    assert.instanceOf(ds, DeliverySearch);
  });
});
