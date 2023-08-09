const router = require("express").Router();
const e = require("express");
const { User, BlogPost, Comments } = require("../models");
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

// GET one blogpost
router.get("/blogpost/:id", withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: Comments,
          attributes: ['id', 'commentsContent', 'commentsDate'],
        },
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
      ],
    });
    const blogPost = blogPostData.get({ plain: true });

    const comments = blogPost.comments;

    res.render("blogPost", {
      blogPost,
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ error: 'Unable to retrieve blogpost.' });
  }
});

// GET all comments for a blogpost
router.get("/blogposts/:id/comments", async (req, res) => {
  try {
    const comments = await Comments.findAll({
      where: {
        commentsPost: req.params.id,
      },
      attributes: ['id', 'commentsContent', 'commentsDate'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Unable to retrieve comments.' });
  }
});


// GET one comment
router.get("/comments/:id", async (req, res) => {
  try {
    const comment = await Comments.findByPk(req.params.id, {
      attributes: ['id', 'commentsContent', 'commentsDate' ],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!comment) {
      res.status(404).json({ error: 'Comment not found.' });
      return;
    }

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Unable to retrieve comment.' });
  }
});

// GET one comment for editing
router.get("/editcomments/:id", async (req, res) => {
    try {
      const comment = await Comments.findByPk(req.params.id, {
        attributes: ['id', 'commentsContent', 'commentsDate' ],
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      if (!comment) {
        res.status(404).json({ error: 'Comment not found.' });
        return;
      }
  
      res.status(200).json(comment);
    } catch (err) {
      res.status(500).json({ error: 'Unable to retrieve comment.' });
    }
  });

// GET all blogposts for a user
router.get("/dashboard", async (req, res) => {
  if (!req.session.logged_in) {
    res.status(401).json({ error: 'Not logged in.' });
    return;
  } else {
    try {
      const blogPostsData = await BlogPost.findAll({
        where: {
          postAuthor: req.session.user_id,
        },
        attributes: ["id","postTitle","postContent","postDate",
        ],
        include: [
          {
            model: Comments,
            attributes: ["id","commentsContent","commentsDate"],
            include: {
              model: User,
              attributes: ["username"],
            },
          },
        ],
      });
      res.status(200).json(blogPostsData);
    } catch (err) {
      res.status(500).json({ error: 'Unable to retrieve blogposts.' });
    }
  }
});

// GET one blogpost for editing
router.get("/edit/:id", async (req, res) => {
  if (!req.session.logged_in) {
    res.status(401).json({ error: 'Not logged in.' });
    return;
  } 

    try {
      const blogPostData = await BlogPost.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });

      if (!blogPostData) {
        res.status(404).json({ error: 'Blogpost not found.' });
        return;
      }
  
      res.status(200).json(blogPostData);
    } catch (err) {
      res.status(500).json({ error: 'Unable to retrieve blogpost.' });
    }
  });

// GET login page
router.get("/login", (req, res) => {
  res.render("login");
});

// GET signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
