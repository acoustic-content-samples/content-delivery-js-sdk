# content-hub-sdk

## Installing

```bash
$ npm i content-delivery-sdk
```

## Example

Import the library to your project
```js
const ContentDeliverySDK = require('content-delivery-sdk');
```

Performing a request for Assets

```js
ContentDeliverySDK.create({
    apiUrl: "",
  })
  .deliverySearch()
  .assets()
  .get()
  .then(deliverySearchResult => {
    // some actions with documents
  })
```

If you want to make a request as authorized user please add username/password to application config:

```js
ContentDeliverySDK.create({
    apiUrl: "",
    username: ""
    password: ""
  })
  .deliverySearch()
  .contentItems()
  .protectedContent()
  .get()
```

You can find more examples in sample folder
