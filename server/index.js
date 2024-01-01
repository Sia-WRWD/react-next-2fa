const express = require('express');
const app = express();
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const { requireToken } = require('./middleware/authMiddleware');
const { accessProtectedResource } = require('./middleware/protectedMiddleware');
const { users, User } = require('./model');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

app.use(cors());

app.use(express.json());
app.use(express.static('public'));
app.listen(5000, () => {
    console.log('Server started on port http://localhost:5000');
});

app.use('/auth', authRoutes);
app.use('/protected', requireToken, protectedRoutes);