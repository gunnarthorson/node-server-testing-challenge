const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { jwtSecret } = require('../api/secrets.js');
const Users = require ('../users/users-modal.js');

router.post('/register', (req, res) => {
    let user = req.body;
    const rounds = process.env.HASH_ROUNDS || 14;
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: err });
    })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
    .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ message: 'Here is your token', token });
        } else {
            res.status(401).json({ message: 'Declined' });
        }
    })
})

function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.username,
    };
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: '1d'
    };
    return jwt.sign(payload, secret, options);
}

module.exports = router;