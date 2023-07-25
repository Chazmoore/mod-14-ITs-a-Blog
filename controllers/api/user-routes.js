const router = require('express').Router();
const {User} = require('../../models/User');
const withAuth = require('../../utils/auth');


router.post('/', async (req, res) => {
    try {
      const dbUserData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.logged_in = true;
        res.status(201).json({ message: `Account created for ${dbUserData.usernam}`});
        });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const dbUserData = await User.findOne({ where: { email: req.body.email } });
  
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
        req.session.usernam = dbUserData.usernam;
        req.session.logged_in = true;
        
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', withAuth, async (req, res) => {
    try {
        if (req.session.loggedIn) {
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



module.exports = router;