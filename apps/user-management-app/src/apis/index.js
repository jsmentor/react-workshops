import express from 'express';
import * as userAPI from './user.api';
import * as userGroupAPI from './user-group.api';

const router = express.Router();

router.get('/groups', userGroupAPI.index);
router.get('/groups/:id', userGroupAPI.show);
router.post('/groups', userGroupAPI.create);
router.put('/groups/:id', userGroupAPI.update);
router.get('/groups/:name/users', userGroupAPI.users);
router.post('/groups/:name/users', userGroupAPI.assignUsersToGroup);
router.put('/groups/:name/users', userGroupAPI.unassignUsersFromGroup);
router.delete('/groups/:id', userGroupAPI.destroy);

router.get('/users', userAPI.index);
router.get('/users/:id', userAPI.show);
router.post('/users', userAPI.create);
router.put('/users/:id', userAPI.update);
router.get('/users/:id/groups', userAPI.groups);
router.delete('/users/:id', userAPI.destroy);

export default router;
