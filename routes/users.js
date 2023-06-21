const router = require('express').Router();

const {
  getUsersInfo,
  getUserInfoId,
  createUserInfo,
  updateProfileUserAvatar,
  editProfileUserInfo,
} = require('../controllers/users');

// Пользователи:
router.get('/', getUsersInfo);
// Конкретный пользователь по его ID:
router.get('/:userId', getUserInfoId);
// Создание пользователя:
router.post('/', createUserInfo);
// Редактирование аватара пользователя:
router.patch('/me/avatar', updateProfileUserAvatar);
// Редактирование данных пользователя:
router.patch('/me', editProfileUserInfo);

module.exports = router;
