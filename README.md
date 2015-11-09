# lazy-api [![Support this project][donate-now]][paypal-donations]

A minimalist module for loading API resources when they are used.

## Philosophy

Having a big service API wrapper written in NodeJS, most of people create a `for` loop and load all API files before doing anything. The files are loaded in RAM. So, It's not so RAM friendly to load them this way.

With the `lazy-api` module this issue is fixed. Lazy API loads the file when the API method is called. If an application only uses one file, only that file will be loaded in RAM. The other will not be loaded.

## Installation

```sh
$ npm i -g lazy-api
```

## Example

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

## Documentation

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

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

 - [`brightbox`](https://github.com/IonicaBizau/node-brightbox) by Ionică Bizău

## License

[KINDLY][license] © [Ionică Bizău][website]

[license]: http://ionicabizau.github.io/kindly-license/?author=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica@gmail.com%3E&year=2014

[website]: http://ionicabizau.net
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md