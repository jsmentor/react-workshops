import awaitify from 'awaitify';
import mongoose from 'mongoose';
import _ from 'lodash';
import UserGroup from './models/user-group.model';
import User from './models/user.model';

const Schema = mongoose.Schema;

export const loadGroupUsers = awaitify(function *(name) {
  const userGroup = yield UserGroup.findOne({name}).exec();
  if (!userGroup) {
    return;
  }
  if (!_.isArray(userGroup.users) || !userGroup.users.length) {
    return [];
  }
  return User.find({_id: {$in: userGroup.users.map(String)}}).exec();
});

export const loadUserGroups = awaitify(function *(id) {
  return UserGroup.find({users: id}).exec();
});