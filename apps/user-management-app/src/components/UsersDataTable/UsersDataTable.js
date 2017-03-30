import React from 'react';
import _ from 'lodash';
import { DataTable, TableHeader } from 'react-mdl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UsersDataTable.css';

const arrayPush = Array.prototype.push;

class UsersDataTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    const {list, selectedGroup, selectedRows = []} = props;

    this.state = {
      list,
      selectedGroup,
      selectedRows
    };
  }

  componentWillReceiveProps({list, selectedGroup}){
    this.setState({
      list,
      selectedGroup
    });
  }

  onSelectionChanged = (rows) => {
    const {list = []} = this.state;
    const selectedRows = rows.map((_id) => (_.find(list, {_id})));
    this.setState({
      selectedRows
    });
    if(_.isArray(this.props.selectedRows)){
      this.props.selectedRows.splice(0);
      arrayPush.apply(this.props.selectedRows, selectedRows);
    }
    if(_.isFunction(this.props.onSelectionChanged)){
      this.props.onSelectionChanged(selectedRows);
    }
  };

  render() {
    const {selectedGroup, list = []} = this.state;
    const {mini = false} = this.props;

    let tableHeaders = [
      <TableHeader key="email" name="email">Email</TableHeader>,
      ...(mini ? [] : [
          <TableHeader key="firstName" name="firstName">FirstName</TableHeader>,
          <TableHeader key="lastName" name="lastName">LastName</TableHeader>
        ])
    ];

    if (!mini && !selectedGroup) {
      tableHeaders.push(
        <TableHeader key="groups" name="groups"
                     cellFormatter={(groups) => ((groups && groups.length) ? _.map(groups, 'name').join(', ') : 'UnAssigned')}
        >Groups</TableHeader>
      );
    }

    return (
      <DataTable
        className={s.usersDataTable}
        ref="usersTable"
        selectable
        sortable
        shadow={0}
        rowKeyColumn="_id"
        rows={list}
        onSelectionChanged={this.onSelectionChanged}
      >{tableHeaders}
      </DataTable>
    );
  }
}

export default withStyles(s)(UsersDataTable);