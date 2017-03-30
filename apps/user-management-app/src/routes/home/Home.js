/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Link from '../../components/Link';
import { Grid, Cell, Card, CardTitle, CardText, CardActions, CardMenu, Button, IconButton } from 'react-mdl';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

class Home extends React.Component {
  render() {
    const {groups, users} = this.props;
    return (
      <div className={s.root}>
        <div style={{width: '90%', margin: 'auto'}}>
          <Grid className="demo-grid-1">
            <Cell style={{paddingTop: '30px'}} col={6}>
              <Card shadow={0} style={{width: '90%', margin: 'auto'}}>
                <CardTitle style={{color: '#fff', height: '100px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>Users</CardTitle>
                <CardText>
                  There are {users.list.length} users in this system!
                </CardText>
                <CardActions border>
                  <Button colored>
                    <Link to="/users">Go to list</Link>
                  </Button>
                </CardActions>
              </Card>
            </Cell>
            <Cell style={{paddingTop: '30px'}} col={6}>
              <Card shadow={0} style={{width: '90%', margin: 'auto'}}>
                <CardTitle style={{color: '#fff', height: '100px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>Groups</CardTitle>
                <CardText>
                  There are {groups.list.length} groups in this system!
                </CardText>
                <CardActions border>
                  <Button colored>
                    <Link to="/groups">Go to list</Link>
                  </Button>
                </CardActions>
              </Card>
            </Cell>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    users: state.users,
  }
};

export default connect(mapStateToProps)(withStyles(s)(Home));