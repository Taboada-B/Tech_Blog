const router = require('express').Router();
const {User} = require('../../models');

//http://localhost:3001/users

// login route
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({where: {email: req.body.email} });
        //validating email and password
        if (!user || !user.checkPassword(req.body.password)) {
            console.log('here 2')
            return res.status(400).json({message: 'Invalid email or password'})
            
        }
        console.log('here 3')
        req.session.save(() => {
            req.session.userId = user.id;
            req.session.logged_in = true;
            res.json({user, message: 'Logged in!'});
        })
    } catch (error) {
        res.status(500).json(error)
    }

})


// signup route
// User signup
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'Signup successful!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});



// crud for users below
// Get all users
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

// Create a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!userData[0]) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

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

module.exports = router;