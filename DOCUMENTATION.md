## Documentation

You can see below the API reference of this module.

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

