const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not provied' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.username = payload.username;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token not valid' });
  }
};

module.exports = authenticateToken;
