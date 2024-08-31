const router = require('express').Router();
const { User } = require('../../models');
// const withAuth = require('../../utils/auth');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const saveUserDataToFile = (userData) => {
  const filePath = path.join(__dirname, '../../seeds/userData.json');
  const fileData = fs.readFileSync(filePath);
  const users = JSON.parse(fileData);

  users.push(userData);

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

//http://localhost:3001/api/user

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// signup
// api/user
router.post('/signup', async (req, res) => {
  try {
    const {name, email, password} = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await User.create({
      name,
      email,
      password,  // : hashedPassword,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData)
    });

    saveUserDataToFile({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: userData.password, //hashedPassword, 
    });

  } catch (err) {
    res.status(400).json({ message: 'Failed to create user', error: err });
  }
});

// // Update a user
// router.put('/:id', async (req, res) => {
//     try {
//         const userData = await User.update(req.body, {
//             where: {
//                 id: req.params.id,
//             },
//         });

//         if (!userData[0]) {
//             res.status(404).json({ message: 'No user found with this id!' });
//             return;
//         }

//         res.status(200).json(userData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// login route attempt 1
// api/user/login

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;  // Destructure the request body

    if (!email || !password) {
      res.status(400).json({ message: 'Please provide both email and password.' });
      return;
    }

    const filePath = path.join(__dirname, '../../seeds/userData.json');
    const fileData = fs.readFileSync(filePath);
    const users = JSON.parse(fileData);

    const user = users.find(user => user.email === email);

    // todo user.findOne   with a where clause
    // search database 

    if (!user) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Use bcrypt to compare the plain text password with the hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    console.log('validPassword: ', validPassword);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      console.log('Session data: ', req.session);
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.json({ user: user, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(400).json({ message: 'An error occurred while trying to log in.', error: err.message });
  }
});


// POST TO LOG OUT USER
// localhost:3001/api/user/logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// ROUTE TO CHECK SESSION DATA
// localhost:3001/api/user/session
router.get('/session', (req, res) => {
 try {
  res.json(req.session);
 } catch (error) {
  res.status(500).json({message: 'an error here in session, userRoutes.js'})
 } 
});


module.exports = router;