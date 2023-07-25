const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'content', 'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'content', 'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'Post not found' });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render('single-post', { post, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // You can add validation and other checks here before creating the user

  User.create({
    username,
    password,
  })
    .then(newUser => {
      // Redirect or send a response after successful sign-up
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// route handler for login form submission

router.post('/login', async (req, res) => {
    try {
      const dbUserData = await User.findOne({ where: { username: req.body.username } });
  
      if (!dbUserData) {
        res.status(400).json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect username or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        // Redirect to the home page after successful login
        res.redirect('/');
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.get('/logout', (req, res) => {
    // Destroy the session data to log the user out
    req.session.destroy(err => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        res.redirect('/');
      }
    });
  });

module.exports = router;


