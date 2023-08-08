const router = require("express").Router();
const { BlogPost, Comments } = require("../../models");
const withAuth = require("../../utils/auth");

//CRUD operations for blogposts
// Get all blog posts
router.get("/", async (req, res) => {
  try {
    const allBlogPost = await BlogPost.findAll({
      attributes: ["id", "postTitle", "postContent", "postDate", "postAuthor"],
      include: [
        {
          model: Comments,
          attributes: ["id", "commentsContent", "commentsDate", "commentsAuthor"],
        },
        {
            model: User,
            attributes: ["username"],
        }
      ],
    });
    res.status(200).json(allBlogPost);
  } catch (err) {
    res.status(500).json({error: "Unable to retrieve blogposts."});
  }
});
// Get a single blog post
router.get("/:id", async (req, res) => {
    try {
        const blogPost = await BlogPost.findByPk(req.params.id, {
            attributes: ["id", "postTitle", "postContent", "postDate", "postAuthor"],
            include: [
                {
                    model: Comments,
                    attributes: ["id", "commentsContent", "commentsDate", "commentsAuthor"],
                },
                {
                    model: User,
                    attributes: ["username"],
                }
            ],
        });
        if (!blogPost) {
            res.status(404).json({message: "No blog post found with this id!"});
            return;
        }
        res.status(200).json(blogPost);
    } catch (err) {
        res.status(500).json({error: "Unable to retrieve blogpost."});
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
    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json({ error: "Unable to create blogpost." });
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
    res.status(200).json(deleteBlogPost);
  } catch (err) {
    res.status(500).json({ error: "Unable to delete blogpost." });
  }
});

// Update a blog post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updateBlogPost = await BlogPost.update(
      {
        postTitle: req.body.postTitle,
        postContent: req.body.postContent
      },
      {
        where: {
          postAuthor: req.params.id,
        },
      }
    );
    if (updateBlogPost[0] === 0) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }
    res.status(200).json({ message: 'Blogpost updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Unable to update blogpost.' });
  }
});

module.exports = router;
