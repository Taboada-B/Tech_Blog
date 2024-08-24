const router = require('express').Router();
const {Post, User} = require('../models/index');
const withAuth = require('../utils/auth');

// Define routes

// Route to render the homepage
router.get('/', async (req, res) => {
    try {
      const posts = await Post.findAll(); // Fetch all posts
  
      res.render('homepage', {
        title: 'Syntax Chronicals',
        posts: posts.map(post => post.get({ plain: true })),
        user: req.session.userId // Pass the user data for the conditional rendering
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/login', (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/');
            return;
          }
        
          res.render('login');
    } catch (error) {
        
    }
})

router.get('/dashboard', (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/dashboard');
            return;
          }
        
          res.render('dashboard');
    } catch (error) {
        
    }
})

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
      req.session.destroy(() => {
          res.redirect('/');
      });
  } else {
      res.redirect('/login');
  }
});



module.exports = router;
