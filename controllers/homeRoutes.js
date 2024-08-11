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


router.get('/login', (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/profile');
            return;
          }
        
          res.render('login');
    } catch (error) {
        
    }
})

router.get('/signup', (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/profile');
            return;
          }
        
          res.render('signup');
    } catch (error) {
        
    }
})

module.exports = router;