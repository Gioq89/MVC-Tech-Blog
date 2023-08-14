const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");

// Create a new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.username = newUser.username;
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json({
        user: newUser,
        message: "New user created! You are now logged in!",
      });
    });
  } catch (err) {
    res.status(400).json({ error: "Unable to create a new user." });
  }
});

// POST to login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      res.status(400).json({ error: "Username not found" });
      return;
    }

    const validPassword = await user.checkPassword(req.body.password);

    if (!validPassword) {
        res.status(400).json({ error: "Invalid password" });
        return;
    }

    req.session.save(() => {
      req.session.username = user.username;
      req.session.user_id = user.id;
      req.session.logged_in = true;

      res.status(200).json({ message: "Login successful." });
    });
  } catch (err) {
    res.status(400).json({ error: "Unable to login." });
  }
});

// POST to logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
