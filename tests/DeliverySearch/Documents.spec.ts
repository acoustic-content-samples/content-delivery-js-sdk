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
import Documents from "../../src/sdk/DeliverySearch/Documents";
import DeliverySearchHttpClient from "../../src/sdk/DeliverySearch/DeliverySearchHttpClient";

const config = { apiUrl: "" };

class DocumentsTest extends Documents {
  getQuery() {
    return this.queryBuilder.getQueryObject();
  }

  setRetired(value: boolean): void {
    this.retired = value;
  }

  setDraft(value: boolean): void {
    this.draft = value;
  }

  getDocument(): boolean {
    return this.isDocument;
  }

  getPageNumber(): number {
    return this.pageNumber;
  }
}

describe("Documents", () => {
  let documents: DocumentsTest = null;
  let getStub: sinon.SinonStub = null;

  beforeEach(() => {
    const httpClient: DeliverySearchHttpClient = new DeliverySearchHttpClient(
      config
    );

    documents = new DocumentsTest(httpClient);
    getStub = sinon.stub(axios, "get");
  });

  afterEach(() => {
    getStub.restore();
  });

  describe("Documents.filterBy", () => {
    it("should add one filter item", () => {
      documents.filterBy({ isManaged: "false" });

      const fq = documents.getQuery().fq;

      assert.lengthOf(fq, 1);
      assert.include(fq, "isManaged:false");
    });

    it("should add two filter items", () => {
      documents.filterBy({ isManaged: "false" });
      documents.filterBy({ classification: "asset" });

      const fq = documents.getQuery().fq;

      assert.lengthOf(fq, 2);
      assert.deepEqual(documents.getQuery().fq, [
        "isManaged:false",
        "classification:asset",
      ]);
    });

    it("should be empty filter", () => {
      documents.filterBy({});

      const fq = documents.getQuery().fq;

      assert.lengthOf(fq, 0);
    });
  });

  describe("Documents.sortBy", () => {
    it("should add one sort item", () => {
      documents.sortBy("lastModified", true);

      const sort = documents.getQuery().sort;

      assert.deepEqual(sort, [{ field: "lastModified", ascending: true }]);
      assert.lengthOf(sort, 1);
    });

    it("should add two sort item", () => {
      documents.sortBy("lastModified", true);
      documents.sortBy("created", false);

      const sort = documents.getQuery().sort;

      assert.sameDeepOrderedMembers(sort, [
        { field: "lastModified", ascending: true },
        { field: "created", ascending: false },
      ]);
      assert.lengthOf(sort, 2);
    });

    it("should add two sort items and remove duplicate", () => {
      documents.sortBy("lastModified", true);
      documents.sortBy("created", false);
      documents.sortBy("lastModified", false);

      const sort = documents.getQuery().sort;

      assert.sameDeepOrderedMembers(sort, [
        { field: "created", ascending: false },
        { field: "lastModified", ascending: false },
      ]);
      assert.lengthOf(sort, 2);
    });

    it("should add one sort item and remove duplicate", () => {
      documents.sortBy("lastModified", true);
      documents.sortBy("lastModified", false);
      documents.sortBy("lastModified", true);

      const sort = documents.getQuery().sort;

      assert.sameDeepOrderedMembers(sort, [
        { field: "lastModified", ascending: true },
      ]);
      assert.lengthOf(sort, 1);
    });
  });

  describe("Documents.rows", () => {
    it("should set a value equal 5", () => {
      documents.rows(5);
      assert.equal(documents.getQuery().rows, 5);
    });

    it("should not be set a value", () => {
      documents.rows(0);
      assert.isUndefined(documents.getQuery().rows);

      documents.rows(1.5);
      assert.isUndefined(documents.getQuery().rows);

      documents.rows(-1);
      assert.isUndefined(documents.getQuery().rows);
    });
  });

  describe("Documents.start", () => {
    it("should set a value equal 5", () => {
      documents.start(5);
      assert.equal(documents.getQuery().start, 5);
    });

    it("should not be set a value", () => {
      documents.start(0);
      assert.isUndefined(documents.getQuery().start);

      documents.start(1.5);
      assert.isUndefined(documents.getQuery().start);

      documents.start(-1);
      assert.isUndefined(documents.getQuery().start);
    });
  });

  describe("Documents.filterQuery", () => {
    it("should add one value", () => {
      documents.filterQuery(["isManaged:false"]);

      const fq = documents.getQuery().fq;

      assert.sameOrderedMembers(fq, ["isManaged:false"]);
      assert.lengthOf(fq, 1);
    });

    it("should add two value", () => {
      documents.filterQuery(["isManaged:false"]);
      documents.filterQuery(["classification:asset"]);

      const fq = documents.getQuery().fq;

      assert.sameOrderedMembers(fq, [
        "isManaged:false",
        "classification:asset",
      ]);
      assert.lengthOf(fq, 2);
    });

    it("should be empty", () => {
      documents.filterQuery([]);

      assert.lengthOf(documents.getQuery().fq, 0);
    });
  });

  describe("Documents.makeQueryString", () => {
    it("should return default value", () => {
      assert.equal(
        documents.makeQueryString(),
        "q=*:*&sort=lastModified%20asc&fl=*&fl=document:[json]"
      );
    });

    it("should return a value with defined filters", () => {
      documents.filterBy({ isManaged: "false" });
      documents.filterBy({ classification: "asset" });

      assert.equal(
        documents.makeQueryString(),
        "q=*:*&sort=lastModified%20asc&fq=isManaged:false&fq=classification:asset&fl=*&fl=document:[json]"
      );
    });

    it("should return a value with defined sorts", () => {
      documents.sortBy("lastModified", true);
      documents.sortBy("created", false);

      assert.equal(
        documents.makeQueryString(),
        "q=*:*&sort=lastModified%20asc%2Ccreated%20desc&fl=*&fl=document:[json]"
      );
    });

    it("should return a value with defined rows", () => {
      documents.rows(5);

      assert.equal(
        documents.makeQueryString(),
        "q=*:*&sort=lastModified%20asc&rows=5&fl=*&fl=document:[json]"
      );
    });

    it("should return a value with defined start", () => {
      documents.start(10);

      assert.equal(
        documents.makeQueryString(),
        "q=*:*&sort=lastModified%20asc&start=10&fl=*&fl=document:[json]"
      );
    });

    it("should return the third page", () => {
      documents.page(3);

      assert.equal(
        documents.makeQueryString(),
        "q=*:*&sort=lastModified%20asc&start=20&fl=*&fl=document:[json]"
      );
    });

    it("should return the third page with 20 rows", () => {
      documents.page(3);
      documents.rows(20);

      assert.equal(
        documents.makeQueryString(),
        "q=*:*&sort=lastModified%20asc&rows=20&start=40&fl=*&fl=document:[json]"
      );
    });

    it("should return a value with filters, sorts, rows and start", () => {
      documents.filterBy({ isManaged: "false" });
      documents.filterBy({ classification: "asset" });
      documents.sortBy("lastModified", true);
      documents.sortBy("created", false);
      documents.rows(5);
      documents.start(10);

      assert.equal(
        documents.makeQueryString(),
        "q=*:*&sort=lastModified%20asc%2Ccreated%20desc&rows=5&start=10&fq=isManaged:false&fq=classification:asset&fl=*&fl=document:[json]"
      );
    });

    it("should return the same value for multiple calls", () => {
      documents
        .filterBy({ isManaged: "false" })
        .filterBy({ classification: "asset" })
        .sortBy("lastModified", true)
        .sortBy("created", false)
        .rows(5)
        .start(10);
      documents.setRetired(true);

      assert.equal(
        documents.makeQueryString(),
        "q=*:*&sort=lastModified%20asc%2Ccreated%20desc&rows=5&start=10&fq=isManaged:false&fq=classification:asset&fq=status:(ready%20OR%20retired)&fl=*&fl=document:[json]"
      );
      assert.equal(
        documents.makeQueryString(),
        "q=*:*&sort=lastModified%20asc%2Ccreated%20desc&rows=5&start=10&fq=isManaged:false&fq=classification:asset&fq=status:(ready%20OR%20retired)&fl=*&fl=document:[json]"
      );
    });

    describe("Documents.setStatus", () => {
      it("should add ready and draft status property", () => {
        documents.setDraft(true);

        assert.equal(
          documents.makeQueryString(),
          "q=*:*&sort=lastModified%20asc&fq=draftStatus:*%20OR%20status:ready%20OR%20status:draft&fl=*&fl=document:[json]"
        );
      });

      it("should add ready and retired status property", () => {
        documents.setRetired(true);

        assert.equal(
          documents.makeQueryString(),
          "q=*:*&sort=lastModified%20asc&fq=status:(ready%20OR%20retired)&fl=*&fl=document:[json]"
        );
      });

      it("should add ready, draft and retired status property", () => {
        documents.setDraft(true);
        documents.setRetired(true);

        assert.equal(
          documents.makeQueryString(),
          "q=*:*&sort=lastModified%20asc&fq=status:ready%20OR%20status:draft%20OR%20draftStatus:*%20OR%20status:retired&fl=*&fl=document:[json]"
        );
      });

      it("should add ready and retired status property, do not include draft", () => {
        documents.setDraft(true);
        documents.setRetired(true);
        documents.setDraft(false);

        assert.equal(
          documents.makeQueryString(),
          "q=*:*&sort=lastModified%20asc&fq=status:(ready%20OR%20retired)&fl=*&fl=document:[json]"
        );
      });

      it("should not add draft status property", () => {
        documents.setDraft(false);

        assert.equal(
          documents.makeQueryString(),
          "q=*:*&sort=lastModified%20asc&fl=*&fl=document:[json]"
        );
      });

      it("should not add retired status property", () => {
        documents.setRetired(false);

        assert.equal(
          documents.makeQueryString(),
          "q=*:*&sort=lastModified%20asc&fl=*&fl=document:[json]"
        );
      });

      it("should add ready and draft, but not retired status property", () => {
        documents.setRetired(true);
        documents.setDraft(true);
        documents.setRetired(false);

        assert.equal(
          documents.makeQueryString(),
          "q=*:*&sort=lastModified%20asc&fq=draftStatus:*%20OR%20status:ready%20OR%20status:draft&fl=*&fl=document:[json]"
        );
      });
    });

    it("should include fl parameter with document json by default", () => {
      const query = documents.getQuery();

      assert.include(query.fl, "document:[json]");
    });

    it("should include fl parameter with * by default", () => {
      const query = documents.getQuery();

      assert.include(query.fl, "*");
    });

    it("should exclude document json fl property", () => {
      documents.includeDocument(false);
      assert.equal(
        documents.makeQueryString(),
        "q=*:*&sort=lastModified%20asc&fl=*"
      );
    });
  });

  describe("Documents.page", () => {
    it("should set the second page", () => {
      documents.page(2);
      assert.equal(documents.getPageNumber(), 2);
    });

    it("should ignore wrong value of pageNumber", () => {
      documents.page(-3);
      assert.isUndefined(documents.getPageNumber());

      documents.page(1.5);
      assert.isUndefined(documents.getPageNumber());

      documents.page(Infinity);
      assert.isUndefined(documents.getPageNumber());

      documents.page(-Infinity);
      assert.isUndefined(documents.getPageNumber());
    });
  });

  describe("Documents.searchText", () => {
    it("should set a value", () => {
      const query = documents.getQuery();

      documents.searchText("name:De*");
      assert.deepEqual(query.q, ["name:De*"]);
    });

    it("should not set a value if the value is not a string and length is not more than 0", () => {
      const query = documents.getQuery();

      documents.searchText("");
      assert.lengthOf(query.q, 0);
    });
  });

  describe("Documents.filterByName", () => {
    it("should set a value", () => {
      const query = documents.getQuery();

      documents.filterByName("value");
      assert.deepEqual(query.fq, ["name:%22value%22"]);
    });

    it("should not set a value if it is empty", () => {
      const query = documents.getQuery();

      documents.filterByName("");
      assert.deepEqual(query.fq, []);
    });
  });

  describe("Documents.filterByTags", () => {
    it("should set a value", () => {
      const query = documents.getQuery();

      documents.filterByTags(["tag1", "tag2", "tag3"]);
      assert.deepEqual(query.fq, [
        "tags:(%22tag1%22%20OR%20%22tag2%22%20OR%20%22tag3%22)",
      ]);
    });

    it("should not set a value if it is empty", () => {
      const query = documents.getQuery();

      documents.filterByTags([]);
      assert.deepEqual(query.fq, []);
    });
  });

  describe("Documents.filterById", () => {
    it("should set a value", () => {
      const query = documents.getQuery();

      documents.filterById("value");
      assert.deepEqual(query.fq, ["id:value"]);
    });

    it("should not set a value if it is empty", () => {
      const query = documents.getQuery();

      documents.filterById("");
      assert.deepEqual(query.fq, []);
    });
  });

  describe("Documents.filterByCategory", () => {
    it("should set a value", () => {
      const query = documents.getQuery();

      documents.filterByCategory("value");
      assert.deepEqual(query.fq, ["categories:(%22value%22)"]);
    });

    it("should not set a value if it is empty", () => {
      const query = documents.getQuery();

      documents.filterByCategory("");
      assert.deepEqual(query.fq, []);
    });
  });

  describe("Documents.includeDocument", () => {
    it("should be true", () => {
      documents.includeDocument(true);
      assert.isTrue(documents.getDocument());
    });

    it("should be false", () => {
      documents.includeDocument(false);
      assert.isNotTrue(documents.getDocument());
    });
  });

  describe("Documents.escapeCharacters", () => {
    it('should escape "(", ")", ":", "+" characters', () => {
      assert.equal(documents.escapeCharacters("(1+1):2"), "\\(1\\+1\\)\\:2");
    });

    it('should escape "[", "]", "-", "/" characters', () => {
      assert.equal(
        documents.escapeCharacters("[NOW-2DAYS/DAY TO NOW]"),
        "\\[NOW\\-2DAYS\\/DAY TO NOW\\]"
      );
    });

    it('should escape "[", "]", "-", "(", ")", "*", ":" characters', () => {
      assert.equal(
        documents.escapeCharacters(
          "[NOW-21DAYS TO NOW] OR (*:* NOT tags:[* TO *])"
        ),
        "\\[NOW\\-21DAYS TO NOW\\] OR \\(\\*\\:\\* NOT tags\\:\\[\\* TO \\*\\]\\)"
      );
    });

    it("should escape all specific characters", () => {
      assert.equal(
        documents.escapeCharacters('!*+-&|()[]{}^"~?:/'),
        '\\!\\*\\+\\-\\&\\|\\(\\)\\[\\]\\{\\}\\^\\"\\~\\?\\:\\/'
      );
    });

    it("should return empty string", () => {
      assert.equal(documents.escapeCharacters(""), "");
    });
  });

  describe("Documents.logout", () => {
    it("should make a request for logout endpoint", done => {
      getStub.returns(Promise.resolve());

      documents.logout().then(() => {
        done();
      });
    });
  });

  describe("Documents.previousPage", () => {
    it("should change start parameter", () => {
      documents.start(100).previousPage();

      const query = documents.getQuery();

      assert.equal(query.start, 90);
    });

    it("should not set start parameter less than 0", () => {
      documents.previousPage().previousPage();

      const query = documents.getQuery();

      assert.equal(query.start, 0);
    });
  });
});
