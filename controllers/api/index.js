const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comments-Routes');

// Middleware
router.use('/users', userRoutes);
router.use('/blogPost', postRoutes);
router.use('/comment', commentRoutes);

// Exports
module.exports = router;