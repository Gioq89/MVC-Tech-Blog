const router = require("express").Router();
const { BlogPost, Comments, User } = require("../../models");
const withAuth = require("../../utils/auth");

//CRUD operations for blogposts
// Get all blog posts
router.get("/", async (req, res) => {
  try {
    const allBlogPost = await BlogPost.findAll({
      include: [
        {
          model: Comments,
          attributes: [
            "id",
            "commentsContent",
            "commentsDate",
            "commentsAuthor",
          ],
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const blogPosts = allBlogPost.map((blogPost) =>
      blogPost.get({ plain: true })
    );
    console.log(blogPosts);
    res.send(blogPosts);
  } catch (err) {
    res.status(500).json({ error: "Unable to retrieve blogposts." });
  }
});

// Create a new blog post
router.post("/", withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      postTitle: req.body.postTitle,
      postContent: req.body.postContent,
      postDate: req.body.postDate,
      postAuthor: req.session.user_id,
    });
    res
      .status(200)
      .json({ newBlogPost, message: "Blogpost created successfully." });
  } catch (err) {
    res.status(400).json({ error: "Unable to create blogpost." });
    console.log(err);
  }
});

// Delete a blog post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deleteBlogPost = await BlogPost.destroy({
      where: {
        id: req.params.id,
        postAuthor: req.session.user_id,
      },
    });
    if (!deleteBlogPost) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }
    res
      .status(200)
      .json({ deleteBlogPost, message: "Blogpost deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Unable to delete blogpost." });
  }
});

// Update a blog post
router.put("/:id", withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const updateBlogPost = await BlogPost.update(
      {
        postTitle: req.body.postTitle,
        postContent: req.body.postContent,
        postDate: req.body.postDate,
      },
      {
        where: {
          id: req.params.id,
          postAuthor: req.session.user_id,
        },
      }
    );
    console.log(updateBlogPost);

    res.status(200).json({ message: "Blogpost updated successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to update blogpost." });
  }
});

module.exports = router;
