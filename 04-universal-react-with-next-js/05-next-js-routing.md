# Next.js Routing

As it was mentioned before for routing **the file-system is the main API**.
> Every .js file becomes a route that gets automatically processed and rendered.

Lets try adding a new route and see how it works.

## Add an About page

Create the `AboutPage` component at `./components/AboutPage.js`:
```jsx harmony
import React from 'react';
export default class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <h1>
          About:
        </h1>
        <h2>
          React Workshops 04: Universal React with Next.js - React on the Server
        </h2>
      </div>
    );
  }
}
```

Populate `./pages/about.js` inside your project:

```jsx harmony
import AboutPage from '../components/AboutPage';
export default () => (
  <div className="app-container">
    <AboutPage />
  </div>
)
```
Add a button to HomePage at `./pages/index.js` to navigate to the about page:
```jsx harmony
import React from 'react';
import Router from 'next/router';
export default () => (
  <div className="app-container">
    <h1>Welcome to next.js!</h1>
    <button onClick={() => Router.push('/about')}>About</button>
  </div>
)
```

Add a button to AboutPage at `./pages/about.js` to navigate back to the HomePage:
```jsx harmony
import AboutPage from '../components/AboutPage';
import Router from 'next/router';
export default () => (
  <div className="app-container">
    <AboutPage />
    <button onClick={() => Router.push('/')}>Home</button>
  </div>
)
```