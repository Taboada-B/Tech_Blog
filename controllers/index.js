const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const postRoutes = require('./api/postRoutes'); 
const homeRoutes = require('./homeRoutes');
const authRoutes = require('../utils/auth');

router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes); 
router.use('/login', authRoutes); 
router.use('/signup', authRoutes); 

module.exports = router;
