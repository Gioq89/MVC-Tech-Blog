const router = require('express').Router();
const { BlogPost, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

//CRUD operations for comments
// Create a new comment 
router.post('/', async (req, res) => {
    try {
        const newComment = await Comments.create({
            commentsContent: req.body.commentsContent,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const deleteComment = await Comments.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!deleteComment) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.status(200).json(deleteComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a comment
router.put('/:id', async (req, res) => {
    try {
        const updateComment = await Comments.update({
            commentsContent: req.body.commentsContent,
            user_id: req.session.user_id,
        },
            {
                where: {
                    id: req.params.id,
                },
            });
        if (!updateComment) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.status(200).json(updateComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all comments
router.get('/', async (req, res) => {
    try {
        const allComments = await BlogPost.findAll()({
        include: [
            {
                model: BlogPost,
                attributes: ['postTitle', 'postContent'],
            },
        ],
    });
        res.status(200).json(allComments);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;