const router = require('express').Router();
const { Post, User } = require('../models/index');
const withAuth = require('../utils/auth');

// Define routes

// Route to render the homepage
router.get('/', withAuth, async (req, res) => {
  try {// Fetch all posts
    const postData = await Post.findAll({
      include: {
        model: User,
        attributes: ['name']
      }
    });
    
const posts = postData.map(post => post.get({ plain: true }))
console.log('post: ', posts);  // todo to check for username 

    res.render('homepage', {
      title: 'Syntax Chronicals',
      posts: posts,
      user: req.session.user_id
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

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Fetch the user data from the database
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }, // Exclude sensitive data
      include: [
        {
          model: Post,
          attributes: ['title','content'],
        }
      ],
    });
    console.log('userdata info: ', userData)
    // Check if user data was found
    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Serialize the user data to pass to the template
    const user = userData.get({ plain: true });
    console.log('user info: ', user)
    // Render the dashboard template with user data
    res.render('dashboard', {
      user, // Pass the user object to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// wrong but is rendering right now
router.get('/BlogPost', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: {
        model: Post,
        attributes: ['title', 'content' ]
      }
    });

  // Serialize the user data to pass to the template
  const user = userData.get({ plain: true });

    res.render('blogPost', {
      title: 'Syntax Chronicals',
      user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log('we made it here 85')
    res.status(500).json(err);
  }
});

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }
});



module.exports = router;
