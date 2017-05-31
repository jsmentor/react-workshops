# What are generators?

You can think of generators as processes (pieces of code) that you can pause and resume:

```javascript
function* genFunc() {
    // (A)
    console.log('First');
    yield;
    console.log('Second');
}
```

**Note**:   
- The new syntax: function* is a new "keyword" for generator functions (there are also generator methods).
- `yield` is an operator with which a generator can pause itself.

Additionally, generators can also receive input and send output via `yield`.

When you call a generator function `genFunc()`, you get a **generator object** `genObj` that you can use
to control the process:

```javascript
const genObj = genFunc();
```

The process is initially paused in line A. `genObj.next()` resumes execution, a `yield` inside `genFunc()`
pauses execution:

```javascript
genObj.next();
// Output: First
genObj.next();
// output: Second
```