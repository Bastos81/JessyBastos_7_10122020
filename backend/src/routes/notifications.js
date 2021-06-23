const express = require('express')
const router = express.Router()

const notificationsCtrl = require('../controllers/notifications')

const auth = require('../middleware/auth')

router.get('/', auth, notificationsCtrl.getNotificationsOfOneUser)
router.delete('/:id', auth, notificationsCtrl.deleteNotification)

module.exports = router