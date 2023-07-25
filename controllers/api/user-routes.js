const router = require('express').Router();
const { User } = require('../../models/User');
const withAuth = require('../../utils/auth');


router.post('/', async (req, res) => {
    try {
      const dbUserData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.logged_in = true;
        res.status(201).json({ message: `Account created for ${dbUserData.username}`});
        });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const dbUserData = await User.findOne({ where: { username: req.body.username } });
  
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.logged_in = true;
        
        res.json({ user: dbUserData, message: 'You are now logged in!' });
        res.redirect('/dashboard');
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', withAuth, async (req, res) => {
    try {
        if (req.session.logged_in) {
            const dbUserData = await req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch {
        res.status(400).end();
    }
});

// Logout route handler (change to GET request)
router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Destroy the session to log out the user
    req.session.destroy(err => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        // Redirect the user to the home page after logout
        res.redirect('/');
      }
    });
  } else {
    // If the user is not logged in, simply redirect to the home page
    res.redirect('/');
  }
});



module.exports = router;