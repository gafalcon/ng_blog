const router = require('express').Router();
const auth = require('../middleware/authentication.middleware')
const user_controller = require('../controllers/user.controller')
const {USER_ROLE} = require('../models/user.model')

router.post('/login', user_controller.login)
router.get('/profile', auth(), user_controller.profile)
router.get('/', auth([USER_ROLE.ADMIN]), user_controller.users)
router.put('/role_update', auth([USER_ROLE.ADMIN]), user_controller.updateRole)
router.post('/update_token', auth(), user_controller.getToken)
router.post('/subscribe', user_controller.newSubscription)
router.get('/:user_id', user_controller.profile)
router.get('/:user_id/posts', user_controller.getUserPosts)
module.exports = router
