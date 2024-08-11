const router = require('express').Router();
const {User} = require('../../models');

//http://localhost:3001/users


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