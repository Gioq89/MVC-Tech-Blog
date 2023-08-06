const router = require("express").Router();
const { User, BlogPost, Comments } = require("../models");

// GET all blogposts for homepage without auth
router.get ("/", async (req, res) => {
    try {
        const blogPost = await BlogPost.findAll({
            attributes: { exclude: ["password"] },
            order: [["date_created", "DESC"]],
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });
        const blogposts = blogPost.map((blogpost) => blogpost.get({ plain: true }));
        res.render("homepage", {
            blogposts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET one blogpost
router.get("/blogpost/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    try {
      const blogPostData = await BlogPost.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });

      const blogpost = blogPostData.get({ plain: true });

      res.render("blogpost", {
        ...blogpost,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// GET all comments for a blogpost
router.get("/blogpost/:id/comments", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    try {
      const commentsData = await Comments.findAll({
        where: { commentsPost: req.params.id },
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });

      const comments = commentsData.map((comments) =>
        comments.get({ plain: true })
      );

      res.render("comments", {
        comments,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// GET one comment
router.get("/comments/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    try {
      const commentsData = await Comments.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });

      const comments = commentsData.get({ plain: true });

      res.render("comments", {
        ...comments,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// GET one comment for editing
router.get("/editcomments/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    try {
      const commentsData = await Comments.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });

      const comments = commentsData.get({ plain: true });

      res.render("editcomment", {
        ...comments,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// GET all blogposts for a user
router.get("/dashboard", withAuth, async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    try {
      const blogPostData = await BlogPost.findAll({
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

      const blogposts = blogPostData.map((blogpost) =>
        blogpost.get({ plain: true })
      );

      res.render("dashboard", {
        blogposts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// GET one blogpost for editing
router.get("/edit/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    try {
      const blogPostData = await BlogPost.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });

      const blogpost = blogPostData.get({ plain: true });

      res.render("edit", {
        ...blogpost,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// GET login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// GET signup page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
