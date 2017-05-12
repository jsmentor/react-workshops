# Isomorphism vs Universal JavaScript

## Isomorphism and Universal JavaScript are two different things.

### Isomorphism

Isomorphism in my mind simply refers to the fact that the web application can be rendered on multiple platforms
(in the browser and on the server). **Isomorphism itself is not purely a JavaScript thing**.
You can also build an **isomorphic application** in **Dart** or even **use two different languages/stacks to render the same result**.
In fact there are many **“Isomorphic”** applications which **render a full HTML document on the server using PHP, Java or Ruby** and
use **JavaScript** and **AJAX** to create a rich user experience in the browser.

### Universal JavaScript

Running the same code in the **browser** and on the **server** in order to avoid code duplication is a very different problem.
It is simply a matter of good development practices to avoid code duplication.
This however is not limited to **isomorphic applications**. A utility library such as **Lodash** is **“Universal”**,
but **has nothing to do with isomorphism**:
> Sharing code between environments does not give you an isomorphic application.

What we’re referring to with Universal JavaScript is simply the fact that:
> **it is JavaScript code which is environment agnostic. It can run anywhere**.

In fact most JavaScript code will run fine on any JavaScript platform.


### Note:
To read the main article check out this post: [Isomorphism vs Universal JavaScript](https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb)

## what now?
I let you decide which approach makes more sense but the main point here is that now we know what it means when we say: **Universal JavaScript**