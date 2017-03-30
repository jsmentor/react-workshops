# Redux pattern vs Flux

Like Flux, Redux prescribes that you concentrate your model update logic in a certain layer of your application
(“stores” in Flux, “reducers” in Redux).
Instead of letting the application code directly __mutate__ the data,
both tell you to describe every mutation as a plain object called an __“action”__.

BUT

## Redux does not have the concept of a Dispatcher   
This is because it relies on pure functions instead of event emitters, and pure functions are easy to compose and don't need an additional entity managing them.

## Redux assumes you never mutate your data   
You can use plain objects and arrays for your state just fine, but mutating them inside the reducers is strongly discouraged.