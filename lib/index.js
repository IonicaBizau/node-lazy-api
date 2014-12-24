/**
 * LazyApi
 * Defines the new property in the scope, adding the `get` handler.
 *
 * @name LazyApi
 * @function
 * @param {Object} scope The scope object (default: `this`)
 * @param {String} name Property (API) name
 * @param {String} path The path to JavaScript/JSON file.
 * @return {Object} The object where the property was defined.
 */
var LazyApi = module.exports = function (scope, name, path) {
    if (arguments.length < 3) {
        scope = this;
    }
    Object.defineProperty(scope, name, {
        get: function () {
            return LazyApi.returnHandler.call(this, path, name, scope);
        }
      , enumerable: true
    });
};

/**
 * returnHandler
 * The default function that will be called when a property is accessed.
 * This function can be overrided with custom code.
 *
 * @name returnHandler
 * @function
 * @param {String} path The path to JavaScript/JSON file.
 * @param {String} name Property (API) name
 * @param {Object} scope The scope object (default: `this`)
 * @return {Object} The export object of a JSON/JavaScript file.
 */
LazyApi.returnHandler = function (path, name, scope) {
    return require(path);
};
