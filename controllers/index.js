const User = require('../models/User');

exports.createUser = (req, res) => {
    const { username, email, password } = req.body;
    User.create({ username, email, password })
    .then((user) => {
        res.send(user);
    })
    .catch((error) => {
        console.error('Error creating user:', error);
        res.status(500).send("Internal Server Error");
    });
};