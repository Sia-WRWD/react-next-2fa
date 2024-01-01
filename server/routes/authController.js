const { users, User } = require('../model');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

exports.createSecret = (req, res) => {

    const secret = speakeasy.generateSecret({ length: 20 }); //by default is 30 seconds, but can change to 60 seconds by using the param "step: 60"

    QRCode.toDataURL(secret.otpauth_url, (err, image_data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.send({ qrCode: image_data, secret: secret });
    });
};

exports.verifyUser = (req, res) => {
    const { token, secret } = req.body;

    if (!token) {
        return res.status(401).send('No token provided!');
    }

    const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token,
        window: 1
    });

    if (!verified) {
        return res.status(401).send('Invalid token');
    }

    res.send('Login successful!');
};