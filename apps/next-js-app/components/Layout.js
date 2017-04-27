import React from 'react';
import Router from 'next/router';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => Router.push('/')}>Home</button>
        <button onClick={() => Router.push('/episodes')}>Episodes</button>
        <button onClick={() => Router.push('/about')}>About</button>
        <hr/>
        {this.props.children}
      </div>
    );
  }
}