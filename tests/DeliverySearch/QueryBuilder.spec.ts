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

import QueryBuilder from "../../src/sdk/DeliverySearch/QueryBuilder";
import Query from "../../src/common/Query";

const DEFAULT_QUERY: Query = {
  q: [],
  fq: [],
  fl: ["*", "document:[json]"],
  sort: [],
};

describe("ContentItems", () => {
  let queryBuilder: QueryBuilder = null;

  beforeEach(() => {
    queryBuilder = new QueryBuilder();
  });

  describe("ContentItems.constructor", () => {
    it("should be empty by default", () => {
      assert.deepEqual(queryBuilder.getQueryObject(), {});
    });

    it("should receive initial query data", () => {
      const qb = new QueryBuilder(DEFAULT_QUERY);

      assert.deepEqual(qb.getQueryObject(), DEFAULT_QUERY);
    });
  });

  describe("ContentItems.addFq", () => {
    it("should add a filter to q parameter", () => {
      queryBuilder.addFq("id", "xxxx-xxxx-xxxx-xxxx");

      assert.lengthOf(queryBuilder.getQueryObject().fq, 1);
      assert.deepEqual(queryBuilder.getQueryObject().fq, [
        "id:xxxx-xxxx-xxxx-xxxx",
      ]);
    });

    it("should add encoded value of the filter to q parameter", () => {
      queryBuilder.addFq("id", "'v1 v2'");

      assert.lengthOf(queryBuilder.getQueryObject().fq, 1);
      assert.deepEqual(queryBuilder.getQueryObject().fq, ["id:'v1%20v2'"]);
    });
  });

  describe("ContentItems.addRawFq", () => {
    it("should add a filter to q parameter", () => {
      queryBuilder.addRawFq("id:xxxx-xxxx-xxxx-xxxx");

      assert.lengthOf(queryBuilder.getQueryObject().fq, 1);
      assert.deepEqual(queryBuilder.getQueryObject().fq, [
        "id:xxxx-xxxx-xxxx-xxxx",
      ]);
    });
  });

  describe("ContentItems.addMultiFq", () => {
    it("should add a filter to q parameter", () => {
      queryBuilder.addMultiFq(
        [
          { field: "field1", value: "v1" },
          { field: "field2", value: "v2" },
          { field: "field3", value: "v3" },
        ],
        "OR"
      );

      assert.lengthOf(queryBuilder.getQueryObject().fq, 1);
      assert.deepEqual(queryBuilder.getQueryObject().fq, [
        "field1:v1%20OR%20field2:v2%20OR%20field3:v3",
      ]);
    });

    it("should add a filter with default operation to q parameter", () => {
      queryBuilder.addMultiFq([
        { field: "field1", value: "v1" },
        { field: "field2", value: "v2" },
        { field: "field3", value: "v3" },
      ]);

      assert.lengthOf(queryBuilder.getQueryObject().fq, 1);
      assert.deepEqual(queryBuilder.getQueryObject().fq, [
        "field1:v1%20AND%20field2:v2%20AND%20field3:v3",
      ]);
    });
  });

  describe("ContentItems.addSort", () => {
    it("should add sort item to sort parameter", () => {
      queryBuilder.addSort("name", true);

      assert.lengthOf(queryBuilder.getQueryObject().sort, 1);
      assert.deepEqual(queryBuilder.getQueryObject().sort, [
        { field: "name", ascending: true },
      ]);
    });
  });

  describe("ContentItems.addRows", () => {
    it("should add the number of rows to rows parameter", () => {
      queryBuilder.addRows(20);

      assert.equal(queryBuilder.getQueryObject().rows, 20);
    });

    it("should override the previous value", () => {
      queryBuilder.addRows(20);
      queryBuilder.addRows(10);

      assert.equal(queryBuilder.getQueryObject().rows, 10);
    });
  });

  describe("ContentItems.addStart", () => {
    it("should add ofset to start parameter", () => {
      queryBuilder.addStart(20);

      assert.equal(queryBuilder.getQueryObject().start, 20);
    });

    it("should override the previous value", () => {
      queryBuilder.addStart(20);
      queryBuilder.addStart(10);

      assert.equal(queryBuilder.getQueryObject().start, 10);
    });
  });

  describe("ContentItems.addQ", () => {
    it("should add a filter to q parameter", () => {
      queryBuilder.addQ("field:value");

      assert.lengthOf(queryBuilder.getQueryObject().q, 1);
      assert.deepEqual(queryBuilder.getQueryObject().q, ["field:value"]);
    });

    it("should add two filters to q parameter", () => {
      queryBuilder.addQ("field:value");
      queryBuilder.addQ("field2:value2");

      assert.lengthOf(queryBuilder.getQueryObject().q, 2);
      assert.deepEqual(queryBuilder.getQueryObject().q, [
        "field:value",
        "field2:value2",
      ]);
    });
  });

  describe("ContentItems.cleanQ", () => {
    it("should remove all q filters from q parameter", () => {
      queryBuilder.addQ("field:value");
      queryBuilder.addQ("field2:value2");
      queryBuilder.cleanQ();

      assert.lengthOf(queryBuilder.getQueryObject().q, 0);
    });
  });

  describe("ContentItems.makeQueryString", () => {
    it("should return empty string if filter are not added", () => {
      assert.equal(queryBuilder.makeQueryString(), "");
    });

    it("should return a query string with all added filters", () => {
      queryBuilder.addFq("id", "xxxx-xxxx-xxxx-xxxx");
      queryBuilder.addSort("name", true);
      queryBuilder.addRows(5);
      queryBuilder.addStart(20);
      queryBuilder.addQ("*:*");

      assert.equal(
        queryBuilder.makeQueryString(),
        "q=*:*&sort=name%20asc&rows=5&start=20&fq=id:xxxx-xxxx-xxxx-xxxx"
      );
    });
  });
});
