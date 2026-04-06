const userModel = require('../models/userModel'); // Importar el modelo de usuario
const jwt = require('jsonwebtoken'); // Importar JWT para manejar tokens
const bcrypt = require('bcrypt'); // Importar bcrypt para manejar contraseñas encriptadas

// Clave secreta para JWT (debería estar en una variable de entorno)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Valor predeterminado si la variable no está configurada

// Función para autenticar al usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificamos si el usuario existe
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Verificamos si la contraseña es correcta
    const isPasswordValid = await bcrypt.compare(password, user.password); // user.password viene encriptado de la BD
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    // Generamos un token JWT con información adicional
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      }, // Información que irá en el token
      JWT_SECRET,
      { expiresIn: '1h' } // Configura el tiempo de expiración del token
    );

    return res.status(200).json({
      message: 'Autenticación exitosa.',
      token // Retornar la información del usuario
    });
  } catch (error) {
    console.error('Error al autenticar al usuario:', error.message);
    return res.status(500).json({ message: 'Error en el servidor.' });
  }
};

// Exportar la función
module.exports = { loginUser };
