const router = require('express').Router();
const { User, BlogPost, Comments } = require('../models');
const withAuth = require('../utils/auth');

// GET all blogposts for homepage with auth
router.get('/', withAuth, async (req, res) => {
    try {
        const blogPost = await BlogPost.findAll({
            attributes: { exclude: ['password'] },
            order: [['date_created', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const blogposts = blogPost.map((blogpost) => blogpost.get({ plain: true }));
        res.render('homepage', {
            blogposts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
