# Intercepting filter pattern

__Intercepting Filter__ is a JavaEE pattern which creates __pluggable filters__ to __process common services__
in a __standard manner without requiring changes to core request processing code__:
> The filters __intercept incoming requests__ and __outgoing responses__, allowing __preprocessing__ and __post-processing__,
and these filters can be added or removed unobtrusively __without changing existing code__.

This pattern applies reusable processing, transparently before and after the actual request execution
by the front and page controllers.

### Note:
To learn more about this pattern you could read its full wikipedia post [here](https://en.wikipedia.org/wiki/Intercepting_filter_pattern).