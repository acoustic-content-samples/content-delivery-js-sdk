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
import axios from "axios";

import DeliverySearchHttpClient from "../../src/sdk/DeliverySearch/DeliverySearchHttpClient";
import LoginResponse from "../../src/sdk/DeliverySearch/interfaces/LoginResponse";
import data from "../TestData/categories.json";
import basicauth from "../TestData/basicauth.json";

const config = { apiUrl: "", username: "username", password: "password" };

class DeliverySearchHttpClientTest extends DeliverySearchHttpClient {
  public getSearchUrl() {
    return super.getSearchUrl();
  }
}

describe("DeliverySearchHttpClient", () => {
  let httpClient: DeliverySearchHttpClient = null;
  let getStub: sinon.SinonStub = null;

  beforeEach(() => {
    httpClient = new DeliverySearchHttpClient(config);
    getStub = sinon.stub(axios, "get");
  });

  afterEach(() => {
    getStub.restore();
  });

  describe("DeliverySearchHttpClient.login", () => {
    it("should return a promise that represent the result of authentication", done => {
      getStub.returns(Promise.resolve(basicauth));

      httpClient
        .login(config.username, config.password)
        .then((res: Array<LoginResponse>) => {
          assert.deepEqual(res, basicauth);

          done();
        });
    });

    it("should return a promise that represent a response", done => {
      getStub.returns(Promise.resolve({ data }));

      httpClient.get("q=*:*").then(res => {
        assert.deepEqual(res, { data });

        done();
      });
    });

    it("should return a promise that represent an error in case user/password are incorrect", done => {
      getStub.onCall(0).returns(Promise.reject(new Error("message")));

      httpClient.get("q=*:*").catch(error => {
        done();
      });
    });

    it("should return a promise that represent a response for preview subdomain", done => {
      getStub.returns(Promise.resolve({ data }));

      httpClient.isPreview = true;

      httpClient.get("q=*:*").then(res => {
        httpClient.isPreview = false;
        assert.deepEqual(res, { data });

        done();
      });
    });
  });

  describe("DeliverySearchHttpClient.get", () => {
    it("should return a promise that represent a response", done => {
      const httpClientDefault = new DeliverySearchHttpClient({
        apiUrl: "apiUrl",
      });

      getStub.returns(Promise.resolve({ data }));

      httpClientDefault.get("q=*:*").then(res => {
        assert.deepEqual(res, { data });

        done();
      });
    });
  });

  describe("DeliverySearchHttpClient.getHttpConfig", () => {
    it("should return default value", () => {
      const httpClientDefault = new DeliverySearchHttpClient({
        apiUrl: "apiUrl",
      });

      assert.deepEqual(httpClientDefault.getHttpConfig(), {});
    });

    it("should return default value for browser", () => {
      const globalAny: any = global;

      globalAny.window = { document: {} };
      assert.deepEqual(httpClient.getHttpConfig(), { withCredentials: true });
      globalAny.window = undefined;
    });

    it("should return default value for browser with rendering search url", () => {
      const globalAny: any = global;

      globalAny.window = { document: {} };
      httpClient.isCompleteContentContext = true;
      assert.deepEqual(httpClient.getHttpConfig(), {});
      globalAny.window = undefined;
    });

    it("should return a config for logged user", done => {
      getStub.returns(Promise.resolve({ data }));

      httpClient.login(config.username, config.password).then(() => {
        assert.deepEqual(httpClient.getHttpConfig(), {
          auth: {
            username: config.username,
            password: config.password,
          },
        });

        done();
      });
    });
  });

  describe("DeliverySearchHttpClient.makePreview", () => {
    it("should return changed url includes preview subdomain", () => {
      assert.deepEqual(
        httpClient.makePreview("http://my111.test.com"),
        "http://my111-preview.test.com"
      );
    });

    it("should not change url", () => {
      assert.deepEqual(
        httpClient.makePreview("http://sub.test.com"),
        "http://sub.test.com"
      );
    });

    it("should return empty string", () => {
      assert.deepEqual(httpClient.makePreview(""), "");
    });
  });

  describe("DeliverySearchHttpClient.getSearchUrl", () => {
    let publishedHttpClient: DeliverySearchHttpClientTest = null;

    beforeEach(() => {
      publishedHttpClient = new DeliverySearchHttpClientTest({
        apiUrl: "http://my111.test.com/api/xxx-xxx-xxx-xxx",
      });
    });

    it("should return default url", () => {
      assert.deepEqual(
        publishedHttpClient.getSearchUrl(),
        "http://my111.test.com/api/xxx-xxx-xxx-xxx/delivery/v1/search"
      );
    });

    it("should return protected content url", () => {
      publishedHttpClient.isProtectedContent = true;
      assert.deepEqual(
        publishedHttpClient.getSearchUrl(),
        "http://my111.test.com/api/xxx-xxx-xxx-xxx/mydelivery/v1/search"
      );
    });

    it("should return complete content context url", () => {
      publishedHttpClient.isCompleteContentContext = true;
      assert.deepEqual(
        publishedHttpClient.getSearchUrl(),
        "http://my111.test.com/api/xxx-xxx-xxx-xxx/delivery/v1/rendering/search"
      );
    });

    it("should return complete content context and protected content url", () => {
      publishedHttpClient.isProtectedContent = true;
      publishedHttpClient.isCompleteContentContext = true;
      assert.deepEqual(
        publishedHttpClient.getSearchUrl(),
        "http://my111.test.com/api/xxx-xxx-xxx-xxx/mydelivery/v1/rendering/search"
      );
    });

    it("should return complete content context and protected content with preview subdomain url", () => {
      publishedHttpClient.isProtectedContent = true;
      publishedHttpClient.isCompleteContentContext = true;
      publishedHttpClient.isPreview = true;
      assert.deepEqual(
        publishedHttpClient.getSearchUrl(),
        "http://my111-preview.test.com/api/xxx-xxx-xxx-xxx/mydelivery/v1/rendering/search"
      );
    });

    it("should return default value after properties are changed", () => {
      publishedHttpClient.isProtectedContent = true;
      publishedHttpClient.isCompleteContentContext = true;
      publishedHttpClient.isPreview = true;

      publishedHttpClient.isProtectedContent = false;
      publishedHttpClient.isCompleteContentContext = false;
      publishedHttpClient.isPreview = false;
      assert.deepEqual(
        publishedHttpClient.getSearchUrl(),
        "http://my111.test.com/api/xxx-xxx-xxx-xxx/delivery/v1/search"
      );
    });
  });

  describe("DeliverySearchHttpClient.logout", () => {
    it("should make a request for logout endpoint", done => {
      getStub.returns(Promise.resolve());

      httpClient.logout().then(() => {
        done();
      });
    });
  });
});
