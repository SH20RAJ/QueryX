# QueryX Examples

Here are some examples demonstrating the usage of QueryX:

## Adding a Class

```javascript
queryX('div').addClass('highlight');
```

## Appending Content

```javascript
queryX('.container').append('<div class="new-element">New Element</div>');
```

## Setting Attributes

```javascript
queryX('input').attr('disabled', true);
```

## Attaching Click Event

```javascript
queryX('button').on('click', function() {
    queryX(this).toggleClass('active');
});
```

## Finding Children

```javascript
queryX('.parent').children();
```

## Finding Closest Ancestor

```javascript
queryX('.element').closest('.container');
```

## Serializing Form Data

```javascript
var formData = queryX('form').serialize();
console.log(formData);
```
