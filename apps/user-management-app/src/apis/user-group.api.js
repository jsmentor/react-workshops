/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

import {notFound, invalidData} from './errors';
import awaitify from 'awaitify';
import _ from 'lodash';
import {loadGroupUsers} from './api-utils';
import UserGroup from './models/user-group.model';
import User from './models/user.model';

export const index = awaitify(function *(req, res, next) {
  try {
    const userGroups = yield UserGroup.find({}).exec();
    res.status(200).json(userGroups);
  } catch (err) {
    return next(err);
  }
});

export const show = awaitify(function *(req, res, next) {
  try {
    const {params:{id}} = req;
    const userGroup = yield UserGroup.findById(id).exec();
    if (!userGroup) {
      return notFound(req, res);
    }
    res.status(200).json(userGroup);
  } catch (err) {
    return next(err);
  }
});

export const create = awaitify(function *(req, res, next) {
  try {
    const {body:{name}} = req;
    if (!name) {
      return invalidData(req, res);
    }
    let userGroup = new UserGroup();
    userGroup.name = name;
    userGroup.users = [];
    const result = yield userGroup.save();
    res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

export const update = awaitify(function *(req, res, next) {
  try {
    const {body:{name}, params:{id}} = req;
    if (!name || !id) {
      return invalidData(req, res);
    }
    const userGroup = yield UserGroup.findById(id).exec();
    if (!userGroup) {
      return notFound(req, res);
    }
    userGroup.name = name;
    const result = yield userGroup.save().exec();
    res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

export const users = awaitify(function *(req, res, next) {
  try {
    const {params:{name}} = req;
    if (!name) {
      return invalidData(req, res);
    }
    const result = yield loadGroupUsers(name);
    if (!result) {
      return notFound(req, res);
    }
    res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

export const assignUsersToGroup = awaitify(function *(req, res, next) {
  try {
    const {body, params:{name}} = req;
    if (!name || !_.isArray(body)) {
      return invalidData(req, res);
    }
    const userGroup = yield UserGroup.findOne({name}).exec();
    if (!userGroup) {
      return notFound(req, res);
    }
    userGroup.users = _.uniq(userGroup.users.concat(body));
    userGroup.markModified('users');
    const result = yield userGroup.save();
    res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

export const unassignUsersFromGroup = awaitify(function *(req, res, next) {
  try {
    const {body, params:{name}} = req;
    if (!name || !_.isArray(body)) {
      return invalidData(req, res);
    }
    const userGroup = yield UserGroup.findOne({name}).exec();
    if (!userGroup) {
      return notFound(req, res);
    }
    _.remove(userGroup.users, id => _.includes(body, String(id)));
    userGroup.markModified('users');
    const result = yield userGroup.save();
    res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

export const destroy = awaitify(function *(req, res, next) {
  try {
    const userGroup = yield UserGroup.findById(req.params.id).exec();
    if (!userGroup || userGroup.users.length) {
      return invalidData(req, res);
    }
    const result = yield UserGroup.findByIdAndRemove(req.params.id).exec();
    res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});
