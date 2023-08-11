const router = require("express").Router();
const { BlogPost } = require("../models");
const withAuth = require("../utils/auth");

// GET all blogposts for dashboard with auth
router.get("/", withAuth, async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll({
      where: {
        postAuthor: req.session.user_id,
      },
    });

      const blogPost = blogPosts.map((blogPost) => blogPost.get({ plain: true }));

      res.render("dashboard", {
        blogPost,
        logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ error: 'Unable to retrieve blogposts for the dashboard.' });
  }
});

// CREATE new blogpost
router.get("/new", withAuth, async (req, res) => {
  try {
    res.render("createPost", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ error: 'Unable to create new blogpost.' });
  }
});

// UPDATE blogpost from dashboard
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id);

    const blogPost = blogPostData.get({ plain: true });

    res.render("editPost", {
      blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ error: 'Unable to edit blogpost.' });
  }
});

module.exports = router;
