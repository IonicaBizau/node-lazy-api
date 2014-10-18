var LazyApi = module.exports = function (scope, name, path) {
    console.log(">", scope, name, path);
    if (arguments.length < 3) {
        scope = this;
    }
    Object.defineProperty(scope, name, {
        get: function () {
            return require(path);
        }
      , enumerable: true
    });
};
