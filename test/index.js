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
