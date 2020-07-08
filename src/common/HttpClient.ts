//
// Copyright 2020 Acoustic, L.P.
// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
//

import axios from "axios";

// axios.defaults.withCredentials = true;

export default class HttpClient {
  /**
   * Make HTTP GET request
   * @param url - the server URL that will be used for the request
   * @param params - the URL parameters to be sent with the request
   * @param config - config options for making requests
   * @returns Promise object represents a response
   */
  get(url: string, params?: URLSearchParams, config?: any): Promise<any> {
    return axios.get(url, {
      ...config,
      params,
    });
  }

  /**
   * Make HTTP POST request
   * @param url - the server URL that will be used for the request
   * @param params - the URL parameters to be sent with the request
   * @returns Promise object represents a response
   */
  post(url: string, params?: URLSearchParams): Promise<any> {
    return axios.post(url, params);
  }
}
