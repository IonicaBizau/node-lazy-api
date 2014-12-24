Lazy API
========
A minimalist module for loading API resources when they are used.

# Philosophy
Having a big service API wrapper written in NodeJS, most of people create
a `for` loop and load all API files before doing anything. The files are
loaded in RAM. So, It's not so RAM friendly to load them this way.

With the `lazy-api` module this issue is fixed. Lazy API loads the file
when the API method is called. If an application only uses one file,
only that file will be loaded in RAM. The other will not be loaded.

# Installation

```sh
$ npm install lazy-api
```

# Example
```js
// Dependencies
var LazyApi = require("../lib");

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

# Documentation
## `LazyApi(scope, name, path)`
Defines the new property in the scope, adding the `get` handler.

### Params
- **Object** `scope`: The scope object (default: `this`)
- **String** `name`: Property (API) name
- **String** `path`: The path to JavaScript/JSON file.

### Return
- **Object** The object where the property was defined.

## `returnHandler(path, name, scope)`
The default function that will be called when a property is accessed.
This function can be overrided with custom code.

### Params
- **String** `path`: The path to JavaScript/JSON file.
- **String** `name`: Property (API) name
- **Object** `scope`: The scope object (default: `this`)

### Return
- **Object** The export object of a JSON/JavaScript file.

## How to contribute
1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
