
# lazy-api [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![Version](https://img.shields.io/npm/v/lazy-api.svg)](https://www.npmjs.com/package/lazy-api) [![Downloads](https://img.shields.io/npm/dt/lazy-api.svg)](https://www.npmjs.com/package/lazy-api) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> A minimalist module for loading API resources when they are used.

## Philosophy

Having a big service API wrapper written in NodeJS, most of people create a `for` loop and load all API files before doing anything. The files are loaded in RAM. So, It's not so RAM friendly to load them this way.

With the `lazy-api` module this issue is fixed. Lazy API loads the file when the API method is called. If an application only uses one file, only that file will be loaded in RAM. The other will not be loaded.


## :cloud: Installation

```sh
$ npm i --save lazy-api
```


## :clipboard: Example



```js
// Dependencies
var LazyApi = require("lazy-api");

var Apis = {};

// Instead of doing
// Apis.some = require("./some");
// we do:
LazyApi(Apis, "some", __dirname + "/some");

// And when we will call this method, the file
// will be loaded in the RAM.
Apis.some.method({foo: "bar"}, function (err, d) {
    console.log(err || d);
});

// What if we need to run some custom handlers?
LazyApi.returnHandler = function (path, name, scope) {
    console.log("Loading " + path);
    return require(path);
};

// "Load" (but not in RAM) the another file
LazyApi(Apis, "another", __dirname + "/another");

// Call the method (this will load the file)
Apis.another.method({foo: "bar"}, function (err, d) {
    console.log(err || d);
});

// Call the method again (the file is already loaded);
Apis.another.method({foo: "bar"}, function (err, d) {
    console.log(err || d);
});
```

## :memo: Documentation


### `LazyApi(scope, name, path)`
Defines the new property in the scope, adding the `get` handler.

#### Params
- **Object** `scope`: The scope object (default: `this`)
- **String** `name`: Property (API) name
- **String** `path`: The path to JavaScript/JSON file.

#### Return
- **Object** The object where the property was defined.

### `returnHandler(path, name, scope)`
The default function that will be called when a property is accessed.
This function can be overrided with custom code.

#### Params
- **String** `path`: The path to JavaScript/JSON file.
- **String** `name`: Property (API) name
- **Object** `scope`: The scope object (default: `this`)

#### Return
- **Object** The export object of a JSON/JavaScript file.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`brightbox`](https://github.com/IonicaBizau/node-brightbox)—A Node.JS module, which provides an object oriented wrapper for the Brightbox API.

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2014#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
