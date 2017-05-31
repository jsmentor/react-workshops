# Iterable values

The following values are iterable:

- Arrays
- Strings
- Maps
- Sets

```javascript
const [a,b] = new Set(['a', 'b', 'c']);

for (const x of ['a', 'b', 'c']) {
  console.log(x);
}

const arr0 = Array.from(new Set(['a', 'b', 'c']));

const arr1 = [...new Set(['a', 'b', 'c'])];

const map = new Map([[false, 'no'], [true, 'yes']]);
const set = new Set(['a', 'b', 'c']);
```