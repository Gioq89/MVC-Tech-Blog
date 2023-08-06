const router = require('express').Router();
const { User } = require('../../models');

// Create a new user   
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            req.session.username = newUser.username;

            res.status(200).json({
                user: newUser,
                message: 'New user created! You are now logged in!'
            });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// POST to login
router.post('/login', async (req, res) => {
    try { 
        const userData = await User.findOne({ where: { email: req.body.email } });
    
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }
// creating variable to check password
        const validPassword = await userData.checkPassword(req.body.password);
// if password is not valid, send error message
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }
// if password is valid, save session and send message
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            res.json({ user: userData, message: 'You are now logged in!' });
        }

        );
    } catch (err) {
        res.status(400).json(err);
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