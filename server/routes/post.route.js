const router = require('express').Router();
const auth = require('../middleware/authentication.middleware')
const post_controller = require('../controllers/post.controller')
const {USER_ROLE} = require('../models/user.model')

router.post('/', auth(), post_controller.newPost)
router.get('/', post_controller.findPostsByUser)
router.get('/:postId', post_controller.getPost)
router.delete('/:postId', auth(), post_controller.deletePost)
router.put('/:postId', auth(), post_controller.editPost)

module.exports = router
