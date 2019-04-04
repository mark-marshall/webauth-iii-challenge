const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department,
    }
    const options = {
        expiresIn: '6h',
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);
    return token;
}

module.exports = generateToken;
  