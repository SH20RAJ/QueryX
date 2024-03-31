# QueryX API Reference

## Methods

### Selection and Filtering

- `queryX(selector, context)`: Creates a new QueryX object with the selected elements.
- `filter(selector)`: Filters the selected elements based on a selector or function.
- `not(selector)`: Removes elements from the set of matched elements.

### DOM Manipulation

- `addClass(className)`: Adds a class to the selected elements.
- `after(content)`: Inserts content after each of the selected elements.
- `append(content)`: Appends content to the inside of each selected element.
- `attr(name, value)`: Gets or sets attributes of the selected elements.
- `before(content)`: Inserts content before each of the selected elements.
- `clone()`: Clones the selected elements.
- `empty()`: Removes all child nodes from the selected elements.
- `html(htmlString)`: Gets or sets the HTML contents of the selected elements.
- `prepend(content)`: Prepends content to the inside of each selected element.
- `remove()`: Removes the selected elements from the DOM.
- `removeClass(className)`: Removes a class from the selected elements.
- `replace(content)`: Replaces each selected element with the provided content.
- `text(textContent)`: Gets or sets the text content of the selected elements.
- `toggleClass(className, state)`: Adds or removes a class from the selected elements based on a boolean state.
- `wrap(wrapper)`: Wraps each selected element with the specified wrapper element.

### DOM Traversal

- `children(selector)`: Gets the children of each selected element, optionally filtered by a selector.
- `closest(selector)`: Gets the first ancestor of each selected element that matches the selector.
- `find(selector)`: Finds descendant elements of the selected elements based on a selector.
- `first()`: Gets the first selected element.
- `last()`: Gets the last selected element.
- `parent(selector)`: Gets the parent of each selected element, optionally filtered by a selector.
- `siblings(selector)`: Gets the siblings of each selected element, optionally filtered by a selector.

### Event Handling

- `on(event, selector, handler)`: Attach an event handler to selected elements based on a delegated selector.
- `off(event, handler)`: Remove an event handler from selected elements.

### Utility

- `serialize()`: Serializes form elements into a query string.
- `size()`: Gets the dimensions of the first selected element.
- `trigger(event)`: Triggers an event on selected elements.
- `unique()`: Removes duplicate elements from the selected set.
