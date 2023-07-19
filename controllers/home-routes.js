const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comments} = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'titlr',
            'content',
            'created_at'
        ],
        include: [{
            model: Comments,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
    {
        model: User,
        attributes: ['username']
    }]
    })
    .then(dbPostData => {
        const post = dbPostData.map(post => post.get({
            plain: true
        }));

        res.render('homepage', {
            post,
            loggeedIn: req.session.loggeedIn
        });
    });

    router.get('/post/:id', (req, res) => {
        Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                model: Comments,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['userename']
            }
        ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({
                    message: 'Post not found'
                });
                return;
            }
            const post = dbPostData.get({
                plain: true
            });
            res.render('single-post', {
                post,
                loggeedIn: req.session.loggeedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
    router.get('/login', (req, res) => {
        if (req.session.loggeedIn) {
            res.redirect('/');
            return;
        }
        res.render('login');
    });

    router.get('*', (req, res)=> {
        res.status(404).send("Access not allowed!");
    })
})

module.exports = router;