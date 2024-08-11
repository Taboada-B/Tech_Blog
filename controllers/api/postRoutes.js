const router = require('express').Router();
const {Post} = require('../../models/index');

//http://localhost:3001/posts

//get post routes

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a post
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create(req.body);
        res.status(201).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a post by ID
router.put('/:id', async (req, res) => {
    try {
        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (affectedRows === 0) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json({ message: 'Post updated successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a post by ID
router.delete('/:id', async (req, res) => {
    try {
        const rowsDeleted = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (rowsDeleted === 0) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;