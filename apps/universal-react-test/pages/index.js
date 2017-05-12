import React from 'react';
import Router from 'next/router';
export default () => (
  <div className="app-container">
    <h1>Welcome to next.js!</h1>
    <button onClick={() => Router.push('/about')}>About</button>
  </div>
)