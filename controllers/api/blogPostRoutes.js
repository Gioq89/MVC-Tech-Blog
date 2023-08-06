const router = require('express').Router();
const { BlogPost, Comments } = require('../models');
const withAuth = require('../utils/auth');

//CRUD operations for blogposts
// Create a new blog post
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create({
            postTitle: req.body.postTitle,
            postContent: req.body.postContent,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlogPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a blog post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteBlogPost = await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!deleteBlogPost) {
            res.status(404).json({ message: 'No blog post found with this id!' });
            return;
        }
        res.status(200).json(deleteBlogPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a blog post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateBlogPost = await BlogPost.update({
            postTitle: req.body.postTitle,
            postContent: req.body.postContent,
            user_id: req.session.user_id,
        },
            {
                where: {
                    id: req.params.id,
                },
            });
        if (!updateBlogPost) {
            res.status(404).json({ message: 'No blog post found with this id!' });
            return;
        }
        res.status(200).json(updateBlogPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all blog posts
router.get('/', async (req, res) => {
    try {
        const allBlogPost = await BlogPost.findAll({
            include: [
                {
                    model: Comments,
                    attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
                },
            ],
        });
        res.status(200).json(allBlogPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;