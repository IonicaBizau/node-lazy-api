var LazyApi = require("../index");

var Apis = {};
LazyApi(Apis, "something", __dirname + "/apis");
Apis.something.method({foo: "bar"}, function (err, d) {
    console.log(err || d);
});
