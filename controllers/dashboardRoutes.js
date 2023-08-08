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
      attributes: ["id", "postTitle", "postContent", "postDate"],
      include: [
        {
          model: Comment,
          attributes: [ "id","commentsContent","commentsDate",],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    res.status(200).json(blogPosts);
  } catch (err) {
    res.status(500).json({ error: 'Unable to retrieve blogposts for the dashboard.' });
  }
});

module.exports = router;
