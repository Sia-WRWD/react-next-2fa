const speakeasy = require('speakeasy');
const { users } = require('../model');

exports.requireToken = (req, res, next) => {
    const { token } = req.body;
    const user = users.find(u => u.email === req.user.email);

    const verified = speakeasy.totp.verify({
        secret: user.secret,
        encoding: 'base32',
        token,
        window: 1
    });

    if (!verified) {
        return res.status(401).send('Invalid token');
    }

    next();
};

exports.accessProtectedResource = (req, res) => {
    res.send('Protected resource accessed successfully');
};