const router = require("express").Router();
const { User, BlogPost } = require("../models");
const withAuth = require("../utils/auth");

// GET all blogposts for homepage without auth
router.get("/", async (req, res) => {
  try {
    const blogPostsData = await BlogPost.findAll({
      include: [  
      {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });

  const blogPosts = blogPostsData.map((blogPost) => blogPost.get({ plain: true }));

    res.render("homepage", {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ error: 'Unable to retrieve blogposts.' });
  }
});

// GET one blogpost by id
router.get("/blogpost/:id", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: Comments,
          include: [ User ],
        },
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    const blogPost = blogPostData.get({ plain: true });

    const comments = blogPost.comments;

    res.render("blogpost", {
      blogPost,
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ error: 'Unable to retrieve blogpost.' });
  }
});


// GET login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// GET signup page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

module.exports = router;
