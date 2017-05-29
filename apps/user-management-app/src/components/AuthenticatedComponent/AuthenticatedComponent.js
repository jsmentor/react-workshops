import React, { Children } from 'react';
import { connect } from 'react-redux';
import { getRestorePasswordPath } from '../../utils';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as actionCreators from '../../actions/authentication';

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      const { isAuthenticated, isCheckingAuthentication, authenticationChecked } = this.props;
      if (!isCheckingAuthentication && !authenticationChecked){
        this.checkAuth(isAuthenticated);
      }
    }

    componentWillReceiveProps({ isAuthenticated, isCheckingAuthentication, authenticationChecked }) {
      if (!isCheckingAuthentication && !authenticationChecked) {
        this.checkAuth(isAuthenticated);
      }
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        this.props.dispatch(push(getRestorePasswordPath(this.props.path)));
      }
    }

    render() {
      const { isAuthenticated } = this.props;

      return isAuthenticated
        ? <Component {...this.props} />
        : (<div className="grid-loader"><img src="/image/svgs/grid.svg" width={30} height={30} /></div>);
    }
  }

  const mapStateToProps = (state) => {
    return {
      ...state.authentication,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(actionCreators, dispatch),
      dispatch,
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
