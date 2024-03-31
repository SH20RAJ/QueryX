# QueryX Documentation

Welcome to the documentation for QueryX! QueryX is a lightweight JavaScript library that provides a jQuery-like interface for DOM manipulation and traversal. It allows you to select elements, add/remove classes, manipulate attributes, traverse the DOM, and more, similar to jQuery but in a simpler and more lightweight manner.

## Installation

You can include QueryX in your project by downloading the `queryX.js` file and adding it to your project directory. Then include it in your HTML file:

```html
<script src="path/to/queryX.js"></script>
```

Alternatively, you can use a CDN link:

```html
<script src="https://cdn.jsdelivr.net/npm/queryx"></script>
```

## Usage

### Selecting Elements

You can select elements using CSS selectors:

```javascript
// Select all buttons
queryX('button');
```

### DOM Manipulation

#### Adding a Class

```javascript
queryX('div').addClass('highlight');
```

#### Appending Content

```javascript
queryX('.container').append('<div class="new-element">New Element</div>');
```

#### Setting Attributes

```javascript
queryX('input').attr('disabled', true);
```

### Event Handling

#### Attaching Click Event

```javascript
queryX('button').on('click', function() {
    queryX(this).toggleClass('active');
});
```

### DOM Traversal

#### Finding Children

```javascript
queryX('.parent').children();
```

#### Finding Closest Ancestor

```javascript
queryX('.element').closest('.container');
```

### Utility

#### Serializing Form Data

```javascript
var formData = queryX('form').serialize();
console.log(formData);
```

## API Reference

For detailed information on all methods and properties available in QueryX, please refer to the [API Reference](api-reference.md).

## Examples

Check out the [Examples](examples.md) for some practical use cases and code snippets.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
