const router = require("express").Router();
const { Comments } = require("../../models");
const withAuth = require("../../utils/auth");

//CRUD operations for comments
// Get all comments
router.get("/", async (req, res) => {
  try {
    const allComments = await Comments.findAll();
    res.status(200).json(allComments);
  } catch (err) {
    res.status(500).json({ error: "Unable to get all comments." });
  }
});
// Create a new comment
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comments.create({
      commentsContent: req.body.commentsContent,
      commentsPost: req.body.post_id,
      commentsAuthor: req.session.user_id,
      commentsDate: req.body.commentsDate,
    });
    res.status(200).json({ newComment, message: "New comment created!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Unable to create a new comment." });
  }
});

module.exports = router;
