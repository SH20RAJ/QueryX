# QueryX

[![GitHub license](https://img.shields.io/github/license/SH20RAJ/QueryX.svg?)](https://github.com/SH20RAJ/QueryX/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/SH20RAJ/QueryX.svg)](https://github.com/SH20RAJ/QueryX/issues)
[![GitHub stars](https://img.shields.io/github/stars/SH20RAJ/QueryX.svg)](https://github.com/SH20RAJ/QueryX/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/SH20RAJ/QueryX.svg)](https://github.com/SH20RAJ/QueryX/network)

QueryX is a lightweight JavaScript library that provides a jQuery-like interface for DOM manipulation and traversal. It allows you to select elements, add/remove classes, manipulate attributes, traverse the DOM, and more, similar to jQuery but in a simpler and more lightweight manner.

[Dev.to
](https://dev.to/sh20raj/queryx-a-lightweight-javascript-library-for-dom-manipulation-3hic)
## Features

- **DOM Selection:** Select elements from the DOM using CSS selectors.
- **DOM Manipulation:** Add, remove, and modify elements and their attributes.
- **Event Handling:** Attach and detach event handlers to elements.
- **DOM Traversal:** Traverse the DOM tree with ease.
- **Chaining:** Chain multiple operations together for cleaner code.

## Getting Started

To get started with QueryX, include the `queryX.js` file in your project:

```html
<script src="path/to/queryX.js"></script>
```

Alternatively, you can use a CDN link:

```html
<script src="https://cdn.jsdelivr.net/gh/SH20RAJ/QueryX@main/QueryX.js"></script>
```
or
```html
<script src="https://cdn.jsdelivr.net/npm/queryxjs"></script>
```

## Usage

```javascript
// Example Usage
queryX('button').on('click', function() {
    queryX(this).toggleClass('active');
});

queryX('.container').append('<div class="new-element">New Element</div>');

var formData = queryX('form').serialize();
console.log(formData);

queryX('.parent').children().addClass('child-element');

queryX('.element').closest('.container').css('background-color', 'red');
```

## Documentation

For detailed documentation and examples, please refer to the [Documentation](./docs/) section (link to your documentation).

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

[![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2FSH20RAJ%2FQueryX%2F&labelColor=%23f47373&countColor=%23dce775&style=flat)](https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2FSH20RAJ%2FQueryX%2F)
