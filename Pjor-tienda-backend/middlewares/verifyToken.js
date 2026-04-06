// middlewares/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Asegúrate de que el decoded tiene el campo "id" o "userId"
    req.userId = decoded.id;  // Asumiendo que el JWT tiene un campo "id"
    next();  // Pasa al siguiente middleware o al controlador
  });
};

module.exports = verifyToken;
