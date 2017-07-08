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
import {loadUserGroups} from './api-utils';
import User from './models/user.model';

export const index = awaitify(function * (req, res, next) {
  try{
    const users = yield User.find({}).exec();
    let result = users.map(({_id, id, email, firstName, lastName, phoneNumber}) => ({
      _id, id,
      email, firstName, lastName, phoneNumber,
    }));
    let i = 0;
    let length = result.length;

    for(; i < length ; i += 1){
      let user = result[i];
      user.groups = yield loadUserGroups(user.id);
    }
    res.status(200).json(result);
  } catch (err){
    return next(err);
  }
});

export const show = awaitify(function * (req, res, next) {
  try{
    const user = yield User.findById(req.params.id).exec();
    if (!user) {
      return notFound(req, res);
    }
    res.status(200).json(user);
  } catch (err){
    return next(err);
  }
});

export const groups = awaitify(function *(req, res, next) {
  try {
    const {params:{id}} = req;
    if (!id) {
      return invalidData(req, res);
    }
    const result = yield loadUserGroups(id);
    res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

export const create = awaitify(function * (req, res, next) {
  try{
    const user = new User();
    const {email, firstName, lastName, phoneNumber} = req.body;
    if(!email){
      return invalidData(req, res);
    }
    user.email = email;
    if(firstName){
      user.firstName = firstName;
    }
    if(lastName){
      user.lastName = lastName;
    }
    if(phoneNumber){
      user.phoneNumber = phoneNumber;
    }
    const result = yield user.save();
    res.status(200).json(result);
  } catch (err){
    return next(err);
  }
});

export const update = awaitify(function * (req, res, next) {
  try{
    const user = yield User.findById(req.params.id).exec();
    if (!user) {
      return notFound(req, res);
    }
    const newUser = {};
    if(_.has(req.body, 'email')){
      newUser.email = req.body.email;
    }
    if (_.has(req.body, 'firstName')) {
      newUser.firstName = req.body.firstName;
    }
    if (_.has(req.body, 'lastName')) {
      newUser.lastName = req.body.lastName;
    }
    if (_.has(req.body, 'phoneNumber')) {
      newUser.phoneNumber = req.body.phoneNumber;
    }
    const result = yield User.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
    res.status(200).json(result);
  } catch (err){
    return next(err);
  }
});

export const destroy = awaitify(function * (req, res, next) {
  try{
    const result = yield User.findByIdAndRemove(req.params.id).exec();
    res.status(200).json(result);
  } catch (err){
    return next(err);
  }
});
