const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')
const notificationsCtrl = require('../controllers/notifications')

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.post('/auth/signup', userCtrl.signup)
router.post('/auth/login', userCtrl.login)
router.put('/auth/edit', auth, multer, userCtrl.editUser)

router.get('/users/:id', auth, userCtrl.getOneUser)
router.get('/users', auth, userCtrl.getAllUsers)
router.delete('/users/:id', auth, userCtrl.deleteUserAccount)

router.get('/notifications', auth, notificationsCtrl.getNotificationsOfOneUser)
router.delete('/notifications/:id', auth, notificationsCtrl.deleteNotification)

module.exports = router