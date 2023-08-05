const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const blogPostRoutes = require('./blogPostRoutes.js');
const commentsRoutes = require('./commentsRoutes.js');

router.use('/users', userRoutes);
router.use('/blogposts', blogPostRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;