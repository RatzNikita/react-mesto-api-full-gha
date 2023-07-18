/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const {
  getUsers, getUser, updateAvatar, updateProfile, getUserInfo,
} = require('../controllers/users');
const { updateProfileValidation, updateAvatarValidation, userIdValidation } = require('../validation/celebrateSchemas');

router.get('', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', userIdValidation, getUser);
router.patch('/me', updateProfileValidation, updateProfile);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
