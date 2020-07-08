//
// Copyright 2020 Acoustic, L.P.
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
//

import Query from "../../common/Query";
import DeliverySearchHttpClient from "./DeliverySearchHttpClient";
import DeliverySearchResult from "./DeliverySearchResult";
import DeliverySearchResponse from "./interfaces/DeliverySearchResponse";
import QueryBuilder from "./QueryBuilder";

const DEFAULT_ROWS = 10;
const DEFAULT_QUERY: Query = {
  q: [],
  fq: [],
  fl: ["*", "document:[json]"],
  sort: [],
};

/**
 * Class Documents represents a base class for Delivery Search data type models that are searched. It provides searching and filtering functionality for Delivery Search API.
 */
export default class Documents {
  protected isDocument: boolean = true;
  protected draft: boolean = false;
  protected retired: boolean = false;
  protected pageNumber: number;
  protected httpClient: DeliverySearchHttpClient;
  protected queryBuilder: QueryBuilder;

  /**
   * Create an object of Documents
   * @param httpClient - object of DeliverySearchHttpClient
   * @param query - initial Query parameters
   */
  constructor(
    httpClient: DeliverySearchHttpClient,
    query: Query = DEFAULT_QUERY
  ) {
    this.httpClient = httpClient;
    this.queryBuilder = new QueryBuilder(query);
  }

  /**
   * Add parameters of filters fq to a request
   * @param filterOptions { key/value } - Dictionary of filters
   * @returns an object of Documents
   */
  public filterBy(filterOptions: { [key: string]: string }): Documents {
    Object.keys(filterOptions).forEach(item => {
      this.queryBuilder.addFq(item, filterOptions[item]);
    });

    return this;
  }

  /**
   * Add sort field to a request
   * @param field - The title of a sort field
   * @param ascending - ascending/descending value of sort field
   * @returns an object of Documents
   */
  public sortBy(field: string, ascending: boolean): Documents {
    const query = this.queryBuilder.getQueryObject();
    const duplicateIdx = query.sort.findIndex(item => item.field === field);

    if (duplicateIdx >= 0) {
      query.sort.splice(duplicateIdx, 1);
    }

    this.queryBuilder.addSort(field, ascending);

    return this;
  }

  /**
   * Add a limit of rows to a request
   * @param rows - Limit of rows
   * @returns an object of Documents
   */
  public rows(rows: number): Documents {
    if (Number.isInteger(rows) && rows > 0) {
      this.queryBuilder.addRows(rows);
    }

    return this;
  }

  /**
   * Add a parameter defining an offset to a request
   * @param start defines an offset
   * @returns an object of Documents
   */
  public start(start: number): Documents {
    if (Number.isInteger(start) && start > 0) {
      this.queryBuilder.addStart(start);
    }

    return this;
  }

  /**
   * Add q filter to a request
   * @param text - Full text search value
   * @returns an object of Documents
   */
  public searchText(text: string): Documents {
    if (typeof text === "string" && text.length > 0) {
      this.queryBuilder.cleanQ();
      this.queryBuilder.addQ(text);
    }

    return this;
  }

  /**
   * Add raw fq filters to a request
   * @param query - A list of filter
   * @returns an object of Documents
   */
  public filterQuery(query: Array<string>): Documents {
    if (Array.isArray(query) && query.length) {
      query.forEach(item => {
        this.queryBuilder.addRawFq(item);
      });
    }

    return this;
  }

  /**
   * Set a number of page
   * @param pageNumber - A number of page
   * @returns an object of Documents
   */
  public page(pageNumber: number): Documents {
    if (Number.isInteger(pageNumber) && pageNumber > 0) {
      this.pageNumber = pageNumber;
    }

    return this;
  }

  /**
   * Set start parameter for next page
   * @returns an object of Documents
   */
  public nextPage(): Documents {
    const query = this.queryBuilder.getQueryObject();
    const rows = query.rows || DEFAULT_ROWS;

    this.queryBuilder.addStart((query.start || 0) + rows);

    return this;
  }

  /**
   * Set start parameter for previous page
   * @returns an object of Documents
   */
  public previousPage(): Documents {
    const query = this.queryBuilder.getQueryObject();
    const rows = query.rows || DEFAULT_ROWS;
    const start = query.start - rows;

    this.queryBuilder.addStart(start >= 0 ? start : 0);

    return this;
  }

  /**
   * Add filter by name to fq parameter
   * @param name - a value of name filter
   * @returns an object of Documents
   */
  public filterByName(name: string): Documents {
    if (typeof name === "string" && name.length > 0) {
      this.filterBy({ name: `"${name}"` });
    }

    return this;
  }

  /**
   * Add filter by tags to fq parameter
   * @param tags Array of tags
   * @returns an object of Documents
   */
  public filterByTags(tags: Array<string>): Documents {
    if (Array.isArray(tags) && tags.length) {
      this.filterBy({ tags: `(${tags.map(tag => `"${tag}"`).join(" OR ")})` });
    }

    return this;
  }

  /**
   * Add filter by id to fq param
   * @param id a value of id filter
   * @returns an object of Documents
   */
  public filterById(id: string): Documents {
    if (typeof id === "string" && id.length > 0) {
      this.filterBy({ id });
    }

    return this;
  }

  /**
   * Add filter by category to fq param
   * @param category a value of category
   * @returns an object of Documents
   */
  public filterByCategory(category: string): Documents {
    if (typeof category === "string" && category.length > 0) {
      this.filterBy({ categories: `("${category}")` });
    }

    return this;
  }

  /**
   * Add or remove "document" field from model of documents
   * @param isDocument include/exclude "document" field
   * @returns an object of Documents
   */
  public includeDocument(isDocument: boolean): Documents {
    this.isDocument = isDocument;

    return this;
  }

  /**
   * Make a request using predefined filters
   * @returns Promise represents DeliverySearchResult
   */
  public get(): Promise<DeliverySearchResult> {
    const queryString = this.makeQueryString();

    return this.httpClient
      .get(queryString)
      .then(
        (res: DeliverySearchResponse) =>
          new DeliverySearchResult(
            res,
            new Documents(this.httpClient, this.queryBuilder.getQueryObject())
          )
      );
  }

  /**
   * Escape specific characters in filter value
   * @param source Filter value
   * @returns escaped string
   */
  public escapeCharacters(source: string): string {
    const result = [];

    if (typeof source === "string" && source.length > 0) {
      for (let i = 0; i < source.length; i++) {
        const char = source.charAt(i);

        if (
          char === "!" ||
          char === "*" ||
          char === "+" ||
          char === "-" ||
          char === "&" ||
          char === "|" ||
          char === "(" ||
          char === ")" ||
          char === "[" ||
          char === "]" ||
          char === "{" ||
          char === "}" ||
          char === "^" ||
          char === '"' ||
          char === "~" ||
          char === "?" ||
          char === ":" ||
          char === "/"
        ) {
          result.push("\\");
        }

        result.push(char);
      }
    }

    return result.join("");
  }

  /**
   * Create a query string for a Solr query
   * @returns a query string
   */
  public makeQueryString(): string {
    const query = this.queryBuilder.getQueryObject();

    this.setStatus();

    if (query.q.length === 0) {
      this.queryBuilder.addQ("*:*");
    }

    if (query.sort.length === 0) {
      this.queryBuilder.addSort("lastModified", true);
    }

    if (Number.isInteger(this.pageNumber) && this.pageNumber > 0) {
      const currentRows = query.rows || DEFAULT_ROWS;
      const start = currentRows * this.pageNumber - currentRows;

      this.queryBuilder.addStart(start);
    }

    if (!this.isDocument) {
      query.fl.splice(1, 1);
    }

    this.resetOptions();

    return this.queryBuilder.makeQueryString();
  }

  /**
   * Make a request for logout
   * @returns Promise with a response
   */
  public logout(): Promise<any> {
    return this.httpClient.logout();
  }

  /**
   * Reset options to default value
   */
  protected resetOptions(): void {
    this.draft = false;
    this.retired = false;
    this.isDocument = true;
  }

  /**
   * Add status filter based on retired and draft variables
   * @returns void
   */
  private setStatus(): void {
    if (this.retired && this.draft) {
      this.queryBuilder.addMultiFq(
        [
          { field: "status", value: "ready" },
          { field: "status", value: "draft" },
          { field: "draftStatus", value: "*" },
          { field: "status", value: "retired" },
        ],
        "OR"
      );

      return;
    }

    if (this.draft) {
      this.queryBuilder.addMultiFq(
        [
          { field: "draftStatus", value: "*" },
          { field: "status", value: "ready" },
          { field: "status", value: "draft" },
        ],
        "OR"
      );
    }

    if (this.retired) {
      this.queryBuilder.addFq("status", "(ready OR retired)");
    }
  }
}
