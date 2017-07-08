import React from 'react';
import _ from 'lodash';
import * as actionCreators from '../../actions/users';
import * as groupActionsCreators from '../../actions/groups';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Users.css';
import UsersDataTable from '../../components/UsersDataTable';
import {
  DataTable, TableHeader, FABButton,
  Icon, Dialog, DialogTitle, DialogContent,
  DialogActions, Textfield, Button
} from 'react-mdl';

const emptyUserInfo = {
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  birthDate: null
};

class Users extends React.Component {
  selectedUsers = [];

  constructor(props, context) {
    super(props, context);

    const { selectedGroup } = props;

    this.state = {
      newUser: {
        ...emptyUserInfo
      },
      showCreateUserDialog: false,
      showAssignUserDialog: false,
      showRemoveConfirm: false,
      errorMessage: '',
      removeError: '',
      selectedGroup
    };

    this.createOrUpdateUser = this.createOrUpdateUser.bind(this);
    this.removeSelectedUsers = this.removeSelectedUsers.bind(this);
    this.assignSelectedUsers = this.assignSelectedUsers.bind(this);
    this.unassignSelectedUsersFromGroup = this.unassignSelectedUsersFromGroup.bind(this);
  }

  loadUsersWithThunk = () => {
    this.props.actions.loadUsers();
  };

  loadUsers = () => {
    this.props.dispatch({ type: 'GET_USERS_LIST_REQUEST' });
  };

  createOrUpdateUser = async function () {
    const { newUser } = this.state;
    if (!newUser) {
      return;
    }
    const action = newUser._id ? 'update' : 'create';
    await this.props.actions[`${action}User`](newUser);
    if (this.props.created || this.props.updated) {
      this.hideCreateUserDialog();
      this.loadUsers();
    } else {
      this.setState({
        errorMessage: `This user can not be ${action}d!`
      });
    }
  };

  removeSelectedUsers = async function () {
    const { selectedGroup } = this.props;
    if (selectedGroup) {
      return this.unassignSelectedUsersFromGroup();
    }
    return this.removeUsers();
  };

  removeUsers = async function () {
    const { selectedRows } = this.state;
    await this.props.actions.removeSelectedUsers(selectedRows.filter((item) => !item.groups.length));
    if (this.props.removed) {
      this.hideRemoveConfirm();
      oadUsers();
    } else {
      this.setState({
        removeError: 'One or more of these users can not be removed!'
      });
    }
  };

  showUserDialog = () => {
    const { selectedGroup } = this.props;
    if (selectedGroup) {
      return this.showAssignUserDialog();
    }
    return this.showCreateUserDialog();
  };

  showCreateUserDialog = () => {
    this.setState({
      showCreateUserDialog: true,
      newUser: {
        ...emptyUserInfo
      },
    });
  };

  showUpdateUserDialog = (userObject) => {
    this.setState({
      showCreateUserDialog: true,
      newUser: {
        ...userObject
      },
    });
  };

  hideCreateUserDialog = () => {
    this.setState({
      showCreateUserDialog: false,
      newUser: {
        ...emptyUserInfo
      },
      errorMessage: ''
    });
  };

  showAssignUserDialog = () => {
    this.setState({
      showAssignUserDialog: true
    });
  };

  hideAssignUserDialog = () => {
    this.setState({
      showAssignUserDialog: false
    });
  };

  assignSelectedUsers = async function () {
    const { selectedGroup } = this.props;
    await this.props.actions.assignSelectedUsers(selectedGroup, this.selectedUsers);
    if (this.props.assigned) {
      this.hideAssignUserDialog();
      this.loadUsers();
      await this.props.groupActions.loadUserGroups();
      await this.props.actions.loadGroupUsers(selectedGroup);
    } else {
      this.setState({
        errorMessage: 'This user can not be created!'
      });
    }
  };

  unassignSelectedUsersFromGroup = async function () {
    const { selectedRows } = this.state;
    const { selectedGroup } = this.props;
    await this.props.actions.unassignSelectedUsers(selectedGroup, selectedRows);
    if (this.props.unassigned) {
      this.hideRemoveConfirm();
      this.loadUsers();
      await this.props.groupActions.loadUserGroups();
      await this.props.actions.loadGroupUsers(selectedGroup);
    } else {
      this.setState({
        errorMessage: 'This user can not be unassigned!'
      });
    }
  };

  showRemoveConfirm = () => {
    this.setState({
      showRemoveConfirm: true
    });
  };

  hideRemoveConfirm = () => {
    this.setState({
      showRemoveConfirm: false,
      removeError: ''
    });
  };

  onSelectionChanged = (selectedRows) => {
    this.setState({
      selectedRows
    });
  };

  onInputChange = (field) => {
    return (e) => {
      const state = this.state;
      this.setState({
        ...state,
        newUser: {
          ...state.newUser,
          [field]: e.target.value
        }
      });
    };
  };

  confirmMessage = () => {
    const { selectedGroup } = this.props;
    if (selectedGroup) {
      return `Are you sure you want to remove the selected users from ${selectedGroup}?`;
    }
    return `You can only remove users which are not assigned to any groups! Are you sure you want to remove them?`;
  };

  render() {
    const { selectedGroup } = this.props;
    const { list = [], loading, loaded, loadError } = this.props;
    let { usersList = [] } = this.props;
    const { showCreateUserDialog, showAssignUserDialog, showRemoveConfirm, errorMessage, selectedRows = [], removeError, newUser = emptyUserInfo } = this.state;
    let usersCanBeRemoved;
    let usersCanBeEdited = selectedRows.length ? selectedRows[0] : false;

    if (selectedGroup) {
      usersCanBeRemoved = selectedRows.length;
      usersList = usersList.filter(({ email }) => (!_.find(list, { email })));
    } else {
      usersCanBeRemoved = !!selectedRows.filter((item) => !item.groups.length).length;
    }

    return (
      <div className={s.usersContainer}>
        <h1>
          {
            selectedGroup ?
              <span>Members of <strong>{selectedGroup}</strong></span>
              : 'Users'
          }
        </h1>
        <FABButton onClick={this.showUserDialog} className={s.addRemoveUser} ripple colored>
          <Icon name="add" />
        </FABButton>
        {
          usersCanBeEdited ?
            (
              <FABButton onClick={() => this.showUpdateUserDialog(usersCanBeEdited)} className={s.addRemoveUser} ripple colored>
                <Icon name="edit" />
              </FABButton>
            ) :
            null
        }
        {
          usersCanBeRemoved ?
            (
              <FABButton onClick={this.showRemoveConfirm} className={s.addRemoveUser} ripple colored>
                <Icon name="remove" />
              </FABButton>
            ) :
            null
        }
        {loaded &&
        <UsersDataTable
          selectedGroup={selectedGroup}
          list={list}
          onSelectionChanged={this.onSelectionChanged} /> }
        <Dialog open={showCreateUserDialog}>
          <DialogTitle>User Information</DialogTitle>
          <DialogContent>
            <Textfield
              onChange={this.onInputChange('email')}
              label="Email"
              value={newUser.email}
              floatingLabel
            />
            <Textfield
              onChange={this.onInputChange('firstName')}
              label="FirstName"
              value={newUser.firstName}
              floatingLabel
            />
            <Textfield
              onChange={this.onInputChange('lastName')}
              label="LastName"
              value={newUser.lastName}
              floatingLabel
            />
            <Textfield
              onChange={this.onInputChange('phoneNumber')}
              label="PhoneNumber"
              value={newUser.phoneNumber}
              floatingLabel
            />
            {errorMessage && <span className={s.errorMessage}>{errorMessage}</span>}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.createOrUpdateUser} type='button'>Save</Button>
            <Button type='button' onClick={this.hideCreateUserDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={showAssignUserDialog}>
          <DialogTitle>{selectedGroup ? selectedGroup : 'Assign'}</DialogTitle>
          <DialogContent>
            {
              usersList.length ?
                (
                  <UsersDataTable list={usersList} selectedRows={this.selectedUsers} mini={true} />
                ) :
                (
                  <span>All the users have been already assigned to {selectedGroup}!</span>
                )
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.assignSelectedUsers} type='button'>Assign</Button>
            <Button type='button' onClick={this.hideAssignUserDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={showRemoveConfirm}>
          <DialogTitle>{selectedGroup || 'Users'}</DialogTitle>
          <DialogContent>
            {removeError ?
              <span className={s.errorMessage}>{removeError}</span> :
              <span>{this.confirmMessage()}</span>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.removeSelectedUsers} type='button'>
              {selectedGroup ? 'Unassign' : 'Remove'}
            </Button>
            <Button type='button' onClick={this.hideRemoveConfirm}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, { selectedGroup }) => {
  let groupUsers;
  if (selectedGroup) {
    groupUsers = _.get(state, `groups.groupUsers[${selectedGroup}]`, {});
  }
  return {
    ...state.users,
    usersList: state.users.list,
    ...(selectedGroup ? {
      list: groupUsers.list || [],
      loading: !!groupUsers.loading,
      loaded: !!groupUsers.loaded,
    } : null)
  }
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
  groupActions: bindActionCreators(groupActionsCreators, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Users));