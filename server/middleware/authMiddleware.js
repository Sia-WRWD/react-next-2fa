const speakeasy = require('speakeasy');
const { users, User } = require('../model');

exports.requireToken = (req, res, next) => {
    const { token, user } = req.body;

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
