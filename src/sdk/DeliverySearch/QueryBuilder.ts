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
import Sorting from "../../common/Sorting";
import FilterItem from "../../common/FilterItem";

/**
 * Class QueryBuilder provides functionality for creating query string for Solr
 */
export default class QueryBuilder {
  private query: Query = {};

  /**
   * Create QueryBuilder object
   * @param query initial data
   */
  constructor(query: Query = {}) {
    this.query = JSON.parse(JSON.stringify(query));
  }

  /**
   * Get an access to query parameters
   * @returns query data
   */
  getQueryObject(): Query {
    return this.query;
  }

  /**
   * Add a filter to fq parameter
   * @param field name of filter
   * @param value value of filter
   */
  addFq(field: string, value: string): void {
    if (!this.query.fq) {
      this.query.fq = [];
    }

    this.query.fq.push(field + ":" + encodeURIComponent(value));
  }

  /**
   * Add a raw filter to fq parameter without encoding
   * Example of value: "status:ready AND isManaged:false"
   *
   * @param field name of filter
   * @param value value of filter
   */
  addRawFq(value: string): void {
    if (!this.query.fq) {
      this.query.fq = [];
    }

    this.query.fq.push(value);
  }

  /**
   * Add a multi filter to fq parameter
   * Example of items: [{ field: "status", value: "ready" }, { field: "isManaged", value: "false" }]
   * Result: "status:ready AND isManaged:false"
   *
   * @param items array of FilterItem objects
   * @param operation logical operation
   */
  addMultiFq(items: Array<FilterItem>, operation: string = "AND"): void {
    if (!this.query.fq) {
      this.query.fq = [];
    }

    const filter = items
      .reduce((arr: Array<string>, item: FilterItem) => {
        arr.push(item.field + ":" + encodeURIComponent(item.value));

        return arr;
      }, [])
      .join(`%20${operation}%20`);

    this.query.fq.push(filter);
  }

  /**
   * Add sorting field to the query
   * @param field name of sort field
   * @param ascending ascending/descending order
   */
  addSort(field: string, ascending: boolean): void {
    if (!this.query.sort) {
      this.query.sort = [];
    }

    this.query.sort.push({
      field,
      ascending,
    });
  }

  /**
   * Add a limit of rows to a query
   * @param rows Limit of rows
   */
  addRows(rows: number): void {
    this.query.rows = rows;
  }

  /**
   * Add a parameter defining an offset to a query
   * @param start defines an offset
   */
  addStart(start: number): void {
    this.query.start = start;
  }

  /**
   * Add a filter to q parameter
   * @param query filter of q parameter
   */
  addQ(query: string): void {
    if (!this.query.q) {
      this.query.q = [];
    }

    this.query.q.push(query);
  }

  /**
   * Reset q parameter of query
   */
  cleanQ(): void {
    this.query.q = [];
  }

  /**
   * Make query string for Solr request based on query parameters
   * @returns query string
   */
  public makeQueryString(): string {
    const r: any = {};

    if (this.query.q && this.query.q.length) {
      r.q = this.query.q.join("%20AND%20");
    }

    if (this.query.sort && this.query.sort.length) {
      r.sort = encodeURIComponent(
        this.query.sort
          .reduce((arr: Array<string>, item: Sorting) => {
            arr.push(item.field + " " + (item.ascending ? "asc" : "desc"));

            return arr;
          }, [])
          .join(",")
      );
    }

    if (this.query.rows) {
      r.rows = this.query.rows;
    }

    if (this.query.start) {
      r.start = this.query.start;
    }

    if (this.query.fq && this.query.fq.length) {
      r.fq = this.query.fq.join("&fq=");
    }

    if (this.query.fl && this.query.fl.length) {
      r.fl = this.query.fl.join("&fl=");
    }

    const str = [];
    for (const p of Object.keys(r)) {
      str.push(p + "=" + r[p]);
    }

    return str.join("&");
  }
}
