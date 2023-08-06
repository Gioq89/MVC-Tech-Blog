const router = require('express').Router();
const { BlogPost } = require('../models');
const withAuth = require('../utils/auth');

// GET all blogposts for dashboard with auth
router.get('/', async (req, res) => {
    try {
        const blogPost = await BlogPost.findAll({
            where: { 
                blogPostUser: req.session.user_id
            },
            attributes: [
                'id', 
                'postTitle', 
                'postContent', 
                'postDate',
                'postAuthor'
            ],
            include: [
                {
                    model: Comment,
                    attributes: [ 'id', 'commentsContent', 'commentsAuthor', 'commentsDate' ],
                    include: {
                        model: User,
                        attributes: ['username'],
                },
            },
            ],
        });

        const blogposts = blogPost.map((blogpost) => blogpost.get({ plain: true }));
        res.render('dashboard', {
            blogposts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log("Unable to get blogposts");
        res.status(500).json(err);
    }
});

  module.exports = router;