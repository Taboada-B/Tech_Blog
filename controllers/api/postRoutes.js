const router = require('express').Router();
const { Post } = require('../../models/index');
const withAuth = require('../../utils/auth');
// const fs = require('fs');
// const path = require('path');

// const savePostToFile = (postData) => {
//   const filePath = path.join(__dirname, '../../seeds/postData.json');

//   try {
//     const fileData = fs.readFileSync(filePath, 'utf-8');
//     const posts = JSON.parse(fileData);

//     posts.push(postData);

//     fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
//     console.log("Post successfully saved to file.");
//   } catch (err) {
//     console.error("Error reading or writing to postData.json:", err);
//   }
// };


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


// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    // redundant, not good saving practice
    // savePostToFile({
    //   title: newPost.title,
    //   content: newPost.content,
    //   user_id: newPost.user_id
    // })

    res.status(200).json(newPost);

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