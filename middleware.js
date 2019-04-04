const jwt = require('jsonwebtoken');
require('dotenv').config();

const restricted = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
          if(err) {
            res.status(401).json({ message: 'say no to token tampering' });
          } else {
            req.decodedToken = decodedToken;
            next();
          }
        })
      } else {
        res.status(400).json({ message: "no credentials found" })
    }
}

module.exports = restricted;