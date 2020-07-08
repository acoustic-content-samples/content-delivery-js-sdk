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
import HttpClient from "../../src/common/HttpClient";

describe("HttpClient", () => {
  let httpClient: HttpClient = null;
  let getStub: sinon.SinonStub = null;
  let postStub: sinon.SinonStub = null;

  before(() => {
    getStub = sinon.stub(axios, "get").callsFake(() => {
      return Promise.resolve({
        config: {
          url: "/",
          method: "get",
          params: new URLSearchParams("title=value"),
        },
        data: {},
      });
    });

    postStub = sinon.stub(axios, "post").callsFake(() => {
      return Promise.resolve({
        config: {
          url: "/",
          method: "post",
          params: new URLSearchParams("title=value"),
        },
        data: {},
      });
    });
  });

  beforeEach(() => {
    httpClient = new HttpClient();
  });

  after(() => {
    getStub.restore();
    postStub.restore();
  });

  describe("HttpClient.get", () => {
    it("make http get request", done => {
      httpClient.get("/").then(res => {
        assert.equal(res.config.url, "/");
        assert.equal(res.config.method, "get");

        done();
      });
    });

    it("make http get request with params", done => {
      const params = new URLSearchParams();

      params.append("title", "value");

      httpClient.get("/", params).then(res => {
        assert.equal(res.config.url, "/");
        assert.equal(res.config.method, "get");
        assert.equal(
          res.config.params.toString(),
          new URLSearchParams("title=value").toString()
        );

        done();
      });
    });
  });

  describe("HttpClient.post", () => {
    it("make http post request", done => {
      httpClient.post("/").then(res => {
        assert.equal(res.config.url, "/");
        assert.equal(res.config.method, "post");

        done();
      });
    });

    it("make http post request with params", done => {
      const params = new URLSearchParams();

      params.append("title", "value");

      httpClient.post("/", params).then(res => {
        assert.equal(res.config.url, "/");
        assert.equal(res.config.method, "post");
        assert.equal(
          res.config.params.toString(),
          new URLSearchParams("title=value").toString()
        );

        done();
      });
    });
  });
});
