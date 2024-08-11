const router = require('express').Router();
const {Post, User} = require('../models/index');
const withAuth = require('../utils/auth');

// Define routes
router.get('/', (req, res) => {
    try {
        res.render('homepage');
    } catch (error) {
         res.error('Error 404');
    }
    
    
   
});

module.exports = router;