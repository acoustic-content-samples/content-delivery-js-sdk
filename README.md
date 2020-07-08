<img src="acoustic-wordmark.svg" alt="Acoustic" title="Acoustic" width="250"/>

# Acoustic Content Delivery JavaScript SDK

Official JavaScript SDK for the Acoustic Content Delivery API.

## Motivation

This SDK is designed to help utilize the content hosted in Acoustic Content libraries in client and server-side applications (headlessly).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installing](#installing)
- [Usage](#usage)
- [Testing](#running-the-tests)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

It is recommended to have the latest version of **Node.js** with **npm** installed to use this SDK in an application. To install Node.js, please follow the official documentation available on [Node.js](https://nodejs.org/en/) website.

### Installing

This SDK is available for installation as a node module directly from the [npm registry](https://npmjs.com). If you are unable to access the public npm registry for some reason, you may download this SDK from CDN. Please refer to the instructions described below for both installation methods.

#### Install using npm:

```bash
$ npm i @acoustic-content/delivery-sdk
```

#### Install using CDN:

```html
<script src="https://link_to_the_cdn"></script>
```

## Usage

### API Reference and Documentation

This SDK is based on the Acoustic Content API's delivery endpoints fully documented at [Acoustic Developers](https://developer.goacoustic.com/acoustic-content/reference#introduction) website.

Additionally, you can generate the documentation with the use of **TypeDoc** by using a command:

```bash
npm run typedoc
```

### How to Use?

To utilize this SDK, you need to import the library to your project first with:

```js
const ContentDeliverySDK = require("@acoustic-content/delivery-sdk");
```

#### Request for Assets

```js
ContentDeliverySDK.create({
  apiUrl: "",
})
  .deliverySearch()
  .assets()
  .get()
  .then((deliverySearchResult) => {
    // some actions with documents
  });
```

#### Request for Assets (with authorization)

If you want to make a request as an authorized user, please add username and password to the application's configuration:

```js
ContentDeliverySDK.create({
    apiUrl: "",
    username: "",
    password: ""
  })
  .deliverySearch()
  .contentItems()
  .protectedContent()
  .get()
```

You can find more examples in the [sample](https://github.com/acoustic-content-samples/content-delivery-js-sdk/tree/master/sample) folder.

## Running the Tests

### Install development dependencies:

```bash
$ npm i
```

### Run Tests

Commands to run tests are provided in [package.json](package.json).

#### Unit test mode:

```bash
$ npm run test
```

#### Integration test mode:

```bash
$ API_URL=<url> USERNAME=<username> PASSWORD=<password> npm run test
```

## Built With

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeDoc](https://typedoc.org/)

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details
