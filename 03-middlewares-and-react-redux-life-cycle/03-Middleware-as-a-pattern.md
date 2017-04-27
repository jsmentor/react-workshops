# Middleware as a pattern

The technique used to implement middleware in __Express__ is not new;
in fact, it can be considered the __Node.js incarnation__ of the __Intercepting Filter pattern__
and the __Chain of Responsibility pattern__.
In more generic terms, it also __represents a processing pipeline__, which reminds us about __streams__.
Today, in Node.js, the word __middleware__ is used __well beyond the boundaries of the express framework__,
and indicates a particular pattern whereby a set of __processing units__, __filters__, and __handlers__,
__under the form of functions__ are connected to __form an asynchronous sequence__ in order to
perform __preprocessing__ and __postprocessing__ of any kind of data.
The main advantage of this pattern is __flexibility__;
in fact, this pattern allows us to obtain a __plugin infrastructure__ with incredibly little effort,
providing an unobtrusive way for __extending a system with new filters and handlers__.