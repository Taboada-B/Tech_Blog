const router = require('express').Router();
const {Post, User} = require('../models/index');
const withAuth = require('../utils/auth');

// Define routes

// Route to render the homepage
router.get('/', withAuth,  async (req, res) => { 
    try {
      const posts = await Post.findAll(); // Fetch all posts
  
      res.render('homepage', {
        title: 'Syntax Chronicals',
        posts: posts.map(post => post.get({ plain: true })),
        user: req.session.user_id // Pass the user data for the conditional rendering req.session.logged_in
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
      res.status(500).json(error)
    }
})

router.get('/dashboard', withAuth, (req, res) => { // 
  console.log('session stuff: ', req.session.logged_in)  
  try {
    res.render('dashboard', {
      user: req.session.user_id // Pass user data if needed
  });
        
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
      req.session.destroy(() => {
          res.redirect('/login');
      });
  } else {

      // res.redirect('/login');
  }
});



module.exports = router;
