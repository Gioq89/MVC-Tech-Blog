const router = require('express').Router();
const { BlogPost, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

//CRUD operations for comments
// Create a new comment 
router.post('/',withAuth, async (req, res) => {
    try {
        const newComment = await Comments.create({
            commentsContent: req.body.commentsContent,
            commentsPost: req.body.post_id,
            commentsAuthor: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json({ error: 'Unable to create a new comment.' });
    }
});

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteComment = await Comments.destroy({
            where: {
                id: req.params.id,
                commentsAuthor: req.session.user_id,
            },
        });
        if (!deleteComment) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.status(200).json(deleteComment);
    } catch (err) {
        res.status(500).json({ error: 'Unable to delete the comment.' });
    }
});

// Update a comment
router.put('/:id', async (req, res) => {
    try {
        const updateComment = await Comments.update({
            commentsContent: req.body.commentsContent
        },
            {
                where: {
                    commentsAuthor: req.params.id,
                },
            });
        if (!updateComment[0] === 0) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.status(200).json(updateComment);
    } catch (err) {
        res.status(500).json({ error: 'Unable to update the comment.' });
    }
});

module.exports = router;