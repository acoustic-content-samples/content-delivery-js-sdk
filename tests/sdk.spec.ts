//
// Copyright 2020 Acoustic, L.P.
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
//

import * as chai from "chai";
import * as sinon from "sinon";
import HttpClient from "../src/common/HttpClient";
import DeliverySearchResult from "../src/sdk//DeliverySearch/DeliverySearchResult";
import ContentDeliverySDK = require("../src");
import chaiThings = require("chai-things");
const assert = chai.assert;
const expect = chai.expect;
import category from "./TestData/categories.json";
import assets from "./TestData/assets.json";

chai.should();
chai.use(chaiThings);

const config = {
  apiUrl: process.env.API_URL || "",
  username: process.env.USERNAME || "",
  password: process.env.PASSWORD || "",
};

describe("ContentDeliverySDK requests", () => {
  let getStub: sinon.SinonStub = null;

  before(() => {
    if (!config.apiUrl) {
      getStub = sinon
        .stub(HttpClient.prototype as any, "get")
        .callsFake(url => {
          switch (url) {
            case "/delivery/v1/search?q=*:*&sort=lastModified%20asc&rows=15&fq=classification:category&fl=*&fl=document:[json]":
              return Promise.resolve({
                data: {
                  numFound: 15,
                  documents: category.documents.slice(0, 15),
                },
              });
            case "/delivery/v1/search?q=*:*&sort=lastModified%20asc&fq=classification:asset&fq=draftStatus:*&fq=status:ready%20OR%20status:draft%20OR%20draftStatus:*%20OR%20status:retired&fl=*&fl=document:[json]":
            case "/delivery/v1/search?q=*:*&sort=lastModified%20asc&fq=classification:asset&fq=id:09a014ea-1018-4b8e-9245-e7a8a0b5b9f0&fl=*&fl=document:[json]":
              return Promise.resolve({
                data: {
                  numFound: 1,
                  documents: assets.documents.filter(
                    item => item.id === "09a014ea-1018-4b8e-9245-e7a8a0b5b9f0"
                  ),
                },
              });
            case "/delivery/v1/search?q=*:*&sort=lastModified%20asc&rows=5&start=20&fq=classification:asset&fl=*&fl=document:[json]":
              return Promise.resolve({
                data: {
                  numFound: 5,
                  documents: assets.documents.slice(0, 5),
                },
              });
            case "/delivery/v1/search?q=name:Traveler*&sort=lastModified%20asc&fq=classification:asset&fq=isManaged:true&fl=*&fl=document:[json]":
              return Promise.resolve({
                data: {
                  numFound: 1,
                  documents: assets.documents.filter(
                    item => item.id === "60306716-2147-4c8c-bcdd-b901863512d6"
                  ),
                },
              });
            case "/delivery/v1/search?q=*:*&sort=lastModified%20asc&fq=classification:asset&fq=name:%22Argentina-Country.png%22&fl=*&fl=document:[json]":
            case "/delivery/v1/search?q=*:*&sort=lastModified%20asc&fq=classification:asset&fq=tags:(%22travel%20site%20sample%22)&fl=*&fl=document:[json]":
              return Promise.resolve({
                data: {
                  numFound: 1,
                  documents: assets.documents.filter(
                    item => item.name === "Argentina-Country.png"
                  ),
                },
              });
            default:
              return Promise.resolve({ data: { numFound: 0 } });
          }
        });
    }
  });

  after(() => {
    if (!config.apiUrl) {
      getStub.restore();
    }
  });

  it("should return an instance of DeliverySearchResult", done => {
    const client = ContentDeliverySDK.create(config);

    client
      .deliverySearch()
      .categories()
      .get()
      .then((deliverySearchResult: DeliverySearchResult) => {
        assert.instanceOf(deliverySearchResult, DeliverySearchResult);
        done();
      })
      .catch((error: any) => {
        done(error);
      });
  });

  it("should return categories", done => {
    const client = ContentDeliverySDK.create(config);

    client
      .deliverySearch()
      .categories()
      .get()
      .then((deliverySearchResult: DeliverySearchResult) => {
        deliverySearchResult
          .documents()
          .should.all.have.property("classification", "category");
        done();
      })
      .catch((error: any) => {
        done(error);
      });
  });

  it("should return 15 categories", done => {
    const client = ContentDeliverySDK.create(config);

    client
      .deliverySearch()
      .categories()
      .rows(15)
      .get()
      .then((deliverySearchResult: DeliverySearchResult) => {
        assert.equal(deliverySearchResult.documents().length, 15);
        done();
      })
      .catch((error: any) => {
        done(error);
      });
  });

  it("should return content items", done => {
    const client = ContentDeliverySDK.create(config);

    client
      .deliverySearch()
      .contentItems()
      .get()
      .then((deliverySearchResult: DeliverySearchResult) => {
        deliverySearchResult
          .documents()
          .should.all.have.property("classification", "content");
        done();
      })
      .catch((error: any) => {
        done(error);
      });
  });

  it("should return content types", done => {
    const client = ContentDeliverySDK.create(config);

    client
      .deliverySearch()
      .contentTypes()
      .get()
      .then((deliverySearchResult: DeliverySearchResult) => {
        deliverySearchResult
          .documents()
          .should.all.have.property("classification", "content-type");
        done();
      })
      .catch((error: any) => {
        done(error);
      });
  });

  it("should return assets", done => {
    const client = ContentDeliverySDK.create(config);

    client
      .deliverySearch()
      .assets()
      .get()
      .then((deliverySearchResult: DeliverySearchResult) => {
        deliverySearchResult
          .documents()
          .should.all.have.property("classification", "asset");
        done();
      })
      .catch((error: any) => {
        done(error);
      });
  });

  it("should make a request for draft, retired and ready assets", done => {
    const client = ContentDeliverySDK.create(config);

    client
      .deliverySearch()
      .assets()
      .includeDraft(true)
      .includeRetired(true)
      .filterBy({ draftStatus: "*" })
      .get()
      .then((deliverySearchResult: DeliverySearchResult) => {
        deliverySearchResult
          .documents()
          .should.all.have.property("classification", "asset");
        assert.equal(deliverySearchResult.documents().length, 1);

        done();
      })
      .catch((error: any) => {
        done(error);
      });
  });

  it("should return assets with current id", done => {
    const client = ContentDeliverySDK.create(config);

    client
      .deliverySearch()
      .assets()
      .filterBy({ id: "09a014ea-1018-4b8e-9245-e7a8a0b5b9f0" })
      .get()
      .then((deliverySearchResult: DeliverySearchResult) => {
        deliverySearchResult
          .documents()
          .should.all.have.property("classification", "asset");
        assert.lengthOf(deliverySearchResult.documents(), 1);
        assert.equal(
          deliverySearchResult.documents()[0].id,
          "09a014ea-1018-4b8e-9245-e7a8a0b5b9f0"
        );

        done();
      })
      .catch((error: any) => {
        done(error);
      });
  });

  it("should offset 20 and return 5 assets", done => {
    const client = ContentDeliverySDK.create(config);

    client
      .deliverySearch()
      .assets()
      .rows(5)
      .start(20)
      .get()
      .then((deliverySearchResult: DeliverySearchResult) => {
        deliverySearchResult
          .documents()
          .should.all.have.property("classification", "asset");
        assert.lengthOf(deliverySearchResult.documents(), 5);

        done();
      })
      .catch((error: any) => {
        done(error);
      });
  });

  it("should return asset with 'Traveler' substring name and managed", done => {
    const client = ContentDeliverySDK.create(config);

    client
      .deliverySearch()
      .assets()
      .searchText("name:Traveler*")
      .filterQuery(["isManaged:true"])
      .get()
      .then((deliverySearchResult: DeliverySearchResult) => {
        deliverySearchResult
          .documents()
          .should.all.have.property("classification", "asset");
        assert.lengthOf(deliverySearchResult.documents(), 1);
        assert.equal(
          deliverySearchResult.documents()[0].id,
          "60306716-2147-4c8c-bcdd-b901863512d6"
        );

        done();
      })
      .catch((error: any) => {
        done(error);
      });
  });

  it("should return asset with 'Argentina-Country.png' name", done => {
    const client = ContentDeliverySDK.create(config);

    client
      .deliverySearch()
      .assets()
      .filterByName("Argentina-Country.png")
      .get()
      .then((deliverySearchResult: DeliverySearchResult) => {
        deliverySearchResult
          .documents()
          .should.all.have.property("classification", "asset");
        assert.lengthOf(deliverySearchResult.documents(), 1);
        assert.equal(
          deliverySearchResult.documents()[0].name,
          "Argentina-Country.png"
        );

        done();
      })
      .catch((error: any) => {
        done(error);
      });
  });
});
