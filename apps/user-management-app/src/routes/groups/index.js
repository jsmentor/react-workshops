/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import {loadUsersList, loadUserGroupsList, loadGroupUsersList} from '../../utils';
import Layout from '../../components/Layout';
import Groups from './Groups';
import Users from '../users/Users';

const title = 'Groups';

export default [{
  path: '/groups/:name',
  async action({params, store}) {
    await loadUsersList(store);
    await loadGroupUsersList(store, params.name);
    return {
      title,
      component: <Layout><Users selectedGroup={params.name} title={title} /></Layout>,
    };
  }
}, {
  path: '/groups',
  async action({store}) {
    await loadUserGroupsList(store);
    return {
      title,
      component: <Layout><Groups title={title} /></Layout>,
    };
  }
}];