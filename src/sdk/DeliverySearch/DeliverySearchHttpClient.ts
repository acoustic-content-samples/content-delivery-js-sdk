//
// Copyright 2020 Acoustic, L.P.
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
//

import HttpClient from "../../common/HttpClient";
import AppConfig from "../../common/AppConfig";
import { isBrowser } from "../../common/utils";
import LoginResponse from "./interfaces/LoginResponse";
import {
  publicContentUrl,
  protectedContentUrl,
  deliverySearchUrl,
  basicauthUrl,
  deliveryRenderingContextsUrl,
  version,
  logout,
} from "../../common/Url";

/**
 * Class DeliverySearchHttpClient provides functionality of creating HTTP requests for Delivery Search API
 */
export default class DeliverySearchHttpClient extends HttpClient {
  public isProtectedContent: boolean = false;
  public isCompleteContentContext: boolean = false;
  public isPreview: boolean = false;
  private config: AppConfig;
  private isLoggedIn: boolean = null;

  /**
   * Creates a DeliverySearchHttpClient
   * @param config - The AppConfig object
   */
  constructor(config: AppConfig) {
    super();

    this.config = config;
  }

  /**
   * Change a subdomain to preview for url
   *
   * @param value current url
   * @returns morified url
   */
  public makePreview(value: string): string {
    return value.replace(/\/\/my(.*?)\./, "//my$1-preview.");
  }

  /**
   * Creates http config for a http request
   *
   * @returns Object represents http config
   */
  public getHttpConfig(): any {
    if (isBrowser()) {
      if (this.isCompleteContentContext && !this.isProtectedContent) {
        return {};
      }

      return { withCredentials: true };
    }

    if (
      this.isLoggedIn === false ||
      (!this.config.username && !this.config.password)
    ) {
      return {};
    }

    return {
      auth: {
        username: this.config.username,
        password: this.config.password,
      },
    };
  }

  /**
   * Makes HTTP request with GET method
   * @param queryString
   *
   * @returns Promise object represents the result of HTTP request
   */
  public get(queryString: string): Promise<any> {
    if (
      this.config.username &&
      this.config.password &&
      this.isLoggedIn === null
    ) {
      return this.login(this.config.username, this.config.password).then(
        () => {
          this.isLoggedIn = true;

          return super.get(
            this.getSearchUrl() + "?" + queryString,
            null,
            this.getHttpConfig()
          );
        },
        error => {
          this.isLoggedIn = false;
          throw error;
        }
      );
    }

    return super.get(
      this.getSearchUrl() + "?" + queryString,
      null,
      this.getHttpConfig()
    );
  }

  /**
   * Makes a request for login
   * @param username
   * @param password
   *
   * @returns Promise object represents the result of authentication
   */
  public login(
    username: string,
    password: string
  ): Promise<Array<LoginResponse>> {
    const config = {
      auth: {
        username,
        password,
      },
      withCredentials: true,
    };

    let url = this.config.apiUrl;

    if (this.isPreview) {
      url = this.makePreview(this.config.apiUrl);
    }

    return super.get(url + basicauthUrl, null, config);
  }

  /**
   * Make a request for logout
   * @returns Promise with a response
   */
  public logout(): Promise<any> {
    this.config = { ...this.config, ...{ username: "", password: "" } };
    this.isLoggedIn = null;

    return super.get(this.config.apiUrl + logout);
  }

  /**
   * Create url for search request based on current settings
   *
   * @returns url for search request
   */
  protected getSearchUrl(): string {
    const content = this.isProtectedContent
      ? protectedContentUrl
      : publicContentUrl;
    const path = this.isCompleteContentContext
      ? deliveryRenderingContextsUrl
      : deliverySearchUrl;

    let url = `${this.config.apiUrl}/${content}/${version}/${path}`;

    if (this.isPreview) {
      url = this.makePreview(url);
    }

    return url;
  }
}
