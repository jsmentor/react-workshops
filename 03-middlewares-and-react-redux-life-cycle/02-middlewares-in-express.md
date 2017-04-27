# Middleware in Express

[Express](http://expressjs.com) popularized the term middleware in the Node.js world, binding it to a very specific design pattern.
In express, in fact, a middleware represents:
> a set of services, typically __functions__, that are organized in a pipeline and are
__responsible for processing incoming HTTP requests and relative responses__.

An express middleware has the following signature:
```javascript
function(req, res, next) {
  // ...
}
```
Where:
    - `req` is the incoming HTTP request,
    - `res` is the response,
    - and `next` is the callback to be invoked when the current middleware has completed its tasks and that in turn triggers the next middleware in the __pipeline__.
    
If we think about it, these are all tasks that are not strictly related to the main functionality of an application,
rather, they are accessories, components providing support to the rest of the application and
allowing the actual request handlers __to focus only on their main business logic__.
Essentially, those tasks are __software in the middle__.