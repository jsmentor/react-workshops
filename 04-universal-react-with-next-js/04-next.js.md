# Next.js

- [Next.js Weblog](https://zeit.co/blog/next)
- [Next.js Github Repository](https://github.com/zeit/next.js/)

To understand **HOW** Next.js works and **WHY** it is awesome, before we cover Next.js itself
lets have a quick look into [React Start Kit](https://github.com/kriasoft/react-starter-kit), to see
how we can set up a Universal JavaScript application using React.

## Set up a Universal JavaScript application using React - w/o Next.js
1. First we need to setup all the required dependencies for a React application.
    - React
    - Express and its middlewares
    - A Promise library like [bluebird](https://github.com/petkaantonov/bluebird) or [Q](https://github.com/kriskowal/q)
    - Polyfills like [FastClick](https://github.com/ftlabs/fastclick)
    - [history](https://www.npmjs.com/package/history)
2. A Client side router, we have these two options:
    - [React Router](https://reacttraining.com/react-router/)
    - [Universal Router](https://github.com/kriasoft/universal-router)
3. [Babel](https://babeljs.io/): set up a platform for coding JavaScript/React.js using ES2015+.
4. [Webpack](https://github.com/webpack/webpack):  to bundle JavaScript files for usage in a browser, yet it is also
capable of transforming, bundling, or packaging just about any resource or asset.
5. Add scripts to your package.json, using webpack and babel-node commands you have created:

```json
{
  "scripts": {
    "clean": "babel-node tools/run clean",
    "build": "babel-node tools/run build",
    "start": "babel-node tools/run start"
  }
}
```

6. Create a `server.js` file to run the Express.js application:

```javascript
// server.js
//....
const app = express();
// Configure your express application to make your app universal and support server-side rendering
// .....
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});
```

7. Create a `client.js` file for client side which is in charge of bootstrapping the client-side React and also
is going to be root script file of your client-side bundle. Webpack is going to start bundling your javascript codes for browser right from this file.   

**Note:** these two files: `server.js` and `client.js`, are going to import the same React routes and React Components you have created.
and that's where your application becomes **Universal**. For instance in the initial skeleton of the React Starter Kit
you could find a component named `App` imported on both of this files:

- client.js:
```jsx harmony
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

//...
let appInstance = ReactDOM.render(
  <App context={context}>{route.component}</App>,
  container,
  () => onRenderComplete(route, location),
);
```

- server.js:
```jsx harmony
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

//...
const data = { ...route };
data.children = ReactDOM.renderToString(<App context={context}>{route.component}</App>);
//...
// render the final result in an Express route
```

8. At the end based on this platform you could:
    - run the application in development mode with livereload support, just using this command: `npm start`.
    - build your application: `npm run build`.
    - run your app in production after you built your app: `cd build && npm start`

These steps are the minimum steps you should take in order to scaffold out a skeleton in which
you could write Universal JavaScript code.

## Set up a Universal JavaScript application using React - with Next.js

Now lets see what are the steps we should take to scaffold out a Universal React application using Next.js:

1. First we need to setup all the required dependencies for a React application.

```bash
set APP_NAME="universal-react-live"
cd apps
mkdir $APP_NAME && cd $_ && npm init
npm install next react react-dom -S
```

2. add a script to your package.json like this:

```json
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

3. After that, **the file-system is the main API**. Next.js uses file system as the main API for our routes:
> Every .js file becomes a route that gets automatically processed and rendered.

Populate `./pages/index.js` inside your project:

```jsx harmony
export default () => (
  <div className="app-container">
    <h1>Welcome to next.js!</h1>
  </div>
)
```

4- run `npm run dev`. So far, we get:

 - Automatic transpilation and bundling (with webpack and babel)
 - Hot code reloading
 - Server rendering and indexing of `./pages`
 - Static file serving. `./static/` is mapped to `/static/`
 - Automatic code splitting: Every import you declare gets bundled and served with each page. That means pages never load unnecessary code!
 - [Built-in CSS support](https://github.com/zeit/next.js/#built-in-css-support)
 - [CSS-in-JS](https://github.com/zeit/next.js/#css-in-js)
 - [populating <head>](https://github.com/zeit/next.js/#populating-head)
 - and etc.