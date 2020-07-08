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
import DeliverySearchResult from "../../src/sdk/DeliverySearch/DeliverySearchResult";
import DeliverySearchResponse from "../../src/sdk/DeliverySearch/interfaces/DeliverySearchResponse";
import DeliverySearchHttpClient from "../../src/sdk/DeliverySearch/DeliverySearchHttpClient";
import Documents from "../../src/sdk/DeliverySearch/Documents";
import data from "../TestData/categories.json";
import Categories from "../../src/sdk/DeliverySearch/Categories";

const config = { apiUrl: "" };

describe("DeliverySearchResult", () => {
  let deliverySearchResult: DeliverySearchResult = null;
  let getStub: sinon.SinonStub = null;

  before(() => {
    getStub = sinon.stub(axios, "get").callsFake(() => {
      return Promise.resolve({ data });
    });
  });

  beforeEach(() => {
    const deliverySearchResponse: DeliverySearchResponse = { data };
    const httpClient: DeliverySearchHttpClient = new DeliverySearchHttpClient(
      config
    );
    const categories = new Categories(httpClient);
    deliverySearchResult = new DeliverySearchResult(
      deliverySearchResponse,
      categories
    );
  });

  after(() => {
    getStub.restore();
  });

  describe("DeliverySearchResult.numFound", () => {
    it("should return the number of documents", () => {
      assert.equal(
        deliverySearchResult.numFound(),
        deliverySearchResult.documents().length
      );
    });

    it("should return default value", () => {
      const deliverySearchResponse: DeliverySearchResponse = {
        data: { numFound: null },
      };
      const httpClient: DeliverySearchHttpClient = new DeliverySearchHttpClient(
        config
      );
      const categories = new Categories(httpClient);
      const deliverySearchResultDefault = new DeliverySearchResult(
        deliverySearchResponse,
        categories
      );

      assert.isNumber(deliverySearchResultDefault.numFound());
      assert.equal(deliverySearchResultDefault.numFound(), 0);
      assert.equal(
        deliverySearchResultDefault.numFound(),
        deliverySearchResultDefault.documents().length
      );
    });
  });

  describe("DeliverySearchResult.documents", () => {
    it("should return default value", () => {
      const deliverySearchResponse: DeliverySearchResponse = {
        data: { numFound: null },
      };
      const httpClient: DeliverySearchHttpClient = new DeliverySearchHttpClient(
        config
      );
      const categories = new Categories(httpClient);
      const deliverySearchResultDefault = new DeliverySearchResult(
        deliverySearchResponse,
        categories
      );

      assert.isArray(deliverySearchResultDefault.documents());
      assert.lengthOf(deliverySearchResultDefault.documents(), 0);
    });

    it("should return response data", () => {
      assert.isArray(deliverySearchResult.documents());
      assert.lengthOf(deliverySearchResult.documents(), 19);
      assert.sameDeepOrderedMembers(
        deliverySearchResult.documents(),
        data.documents
      );
    });
  });

  describe("DeliverySearchResult.nextPage", () => {
    it("should return response data", done => {
      deliverySearchResult
        .nextPage()
        .then((nextDeliverySearchResult: DeliverySearchResult) => {
          assert.notEqual(deliverySearchResult, nextDeliverySearchResult);
          assert.instanceOf(nextDeliverySearchResult, DeliverySearchResult);
          assert.isFunction(nextDeliverySearchResult.numFound);
          assert.isFunction(nextDeliverySearchResult.documents);

          done();
        });
    });
  });

  describe("DeliverySearchResult.previousPage", () => {
    it("should return response data", done => {
      deliverySearchResult
        .previousPage()
        .then((nextDeliverySearchResult: DeliverySearchResult) => {
          assert.notEqual(deliverySearchResult, nextDeliverySearchResult);
          assert.instanceOf(nextDeliverySearchResult, DeliverySearchResult);
          assert.isFunction(nextDeliverySearchResult.numFound);
          assert.isFunction(nextDeliverySearchResult.documents);

          done();
        });
    });
  });
});
