import React from 'react';
import * as actionCreators from '../../actions/groups';
import {getUserGroupsSuccess} from '../../actions/groups';
import {
  DataTable,
  TableHeader,
  FABButton,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Textfield,
  Button
} from 'react-mdl';
import Link from '../../components/Link';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Groups.css';

class Groups extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      newGroupName: '',
      showDialog: false,
      showRemoveConfirm: false,
      errorMessage: '',
      removeError: ''
    };

    this.createUserGroup = this.createUserGroup.bind(this);
    this.removeSelectedUserGroups = this.removeSelectedUserGroups.bind(this);
  }

  createUserGroup = async function () {
    const {newGroupName} = this.state;
    await this.props.actions.createUserGroup(newGroupName);
    if (this.props.created) {
      this.hideGroupDialog();
      this.props.actions.loadUserGroups();
    } else {
      this.setState({
        errorMessage: 'This group can not be created!'
      });
    }
  };

  removeSelectedUserGroups = async function () {
    const {selectedRows} = this.state;
    await this.props.actions.removeSelectedUserGroups(selectedRows.filter((item) => !item.users.length));
    if (this.props.removed) {
      this.hideRemoveConfirm();
      this.props.actions.loadUserGroups();
    } else {
      this.setState({
        removeError: 'One or more of these groups can not be removed!'
      });
    }
  };

  showGroupDialog = () => {
    this.setState({
      showDialog: true,
      newGroupName: '',
    });
  };

  hideGroupDialog = () => {
    this.setState({
      showDialog: false,
      newGroupName: '',
      errorMessage: ''
    });
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

  onSelectionChanged = (rows) => {
    const {list = []} = this.props;
    const selectedRows = rows.map((i) => list[i]);
    this.setState({
      selectedRows
    });
  };

  getList() {
    let {list = []} = this.props;
    list.forEach((item) => {
      item.link = `/groups/${item.name}`;
    });
    return list;
  }

  render() {
    const list = this.getList();
    const {loading, loaded, loadError} = this.props;
    const {showDialog, showRemoveConfirm, errorMessage, selectedRows = [], removeError, newGroupName} = this.state;
    const groupsCanBeRemoved = !!selectedRows.filter((item) => !item.users.length).length;

    return (
      <div className={s.groupsContainer}>
        <h1>Groups</h1>
        <FABButton onClick={this.showGroupDialog} className={s.addRemoveGroup} ripple colored>
          <Icon name="add"/>
        </FABButton>
        {
          groupsCanBeRemoved ?
            (
              <FABButton onClick={this.showRemoveConfirm} className={s.addRemoveGroup} ripple colored>
                <Icon name="remove"/>
              </FABButton>
            ) :
            null
        }
        {loaded && <DataTable
          ref="groupsTable"
          selectable
          sortable
          shadow={0}
          rowKeyColumn="id"
          rows={list}
          onSelectionChanged={this.onSelectionChanged}
        >
          <TableHeader
            id="group-name"
            name="name"
          >
            Name
          </TableHeader>
          <TableHeader
            id="group-users-count"
            name="users"
            numeric
            cellFormatter={(users) => users.length}
          >
            Users Count
          </TableHeader>
          <TableHeader
            id="group-users-list"
            name="link"
            cellFormatter={(link) => (<Link to={link} ><i className="fa fa-users" /></Link>)}
          >
            Link
          </TableHeader>
        </DataTable> }
        <Dialog open={showDialog}>
          <DialogTitle>Group Information</DialogTitle>
          <DialogContent>
            <Textfield
              onChange={(e) => { this.setState({newGroupName: e.target.value}) }}
              label="GroupName"
              value={newGroupName}
              floatingLabel
            />
            {errorMessage && <span className={s.errorMessage}>{errorMessage}</span>}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.createUserGroup} type='button'>Save</Button>
            <Button type='button' onClick={this.hideGroupDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={showRemoveConfirm}>
          <DialogTitle>Remove selected groups</DialogTitle>
          <DialogContent>
            {removeError ?
              <span className={s.errorMessage}>{removeError}</span> :
              <span>You can only remove groups which have no users! Are you sure you want to remove them</span>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.removeSelectedUserGroups} type='button'>Remove</Button>
            <Button type='button' onClick={this.hideRemoveConfirm}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.groups
  }
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Groups));