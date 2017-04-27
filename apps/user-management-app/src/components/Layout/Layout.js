/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {PropTypes} from 'react';
import * as mdl from 'react-mdl';
import Link from '../Link';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const title = (
      <img className={s.logo} src="/logo.png" alt="Thinkful" />
    );
    return (
      <mdl.Layout>
        <mdl.Header transparent title={title} style={{color: 'black', background: '#203049'}}>
          <mdl.Navigation>
            <Link to="/">Home</Link>
            <Link to="/groups">Groups</Link>
            <Link to="/users">Users</Link>
          </mdl.Navigation>
        </mdl.Header>
        <mdl.Drawer style={{background: '#222d32', color: '#fff'}} title={title}>
          <mdl.Navigation>
            <Link to="/">Home</Link>
            <Link to="/groups">Groups</Link>
            <Link to="/users">Users</Link>
          </mdl.Navigation>
        </mdl.Drawer>
        <mdl.Content style={{background: '#ecf0f5'}}>
          {this.props.children}
        </mdl.Content>
      </mdl.Layout>
    );
  }
}

export default withStyles(s)(Layout);
