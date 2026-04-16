const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const addressRoutes = require('./routes/addressRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// 🔥 ORÍGENES PERMITIDOS
const allowedOrigins = [
  'http://localhost:5173',
  'https://pjor-tienda-monorepo.vercel.app'
];

// 🔥 CORS CONFIGURADO CORRECTAMENTE
app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origin (Postman, mobile apps, etc)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// 🔥 SOPORTE PARA PREFLIGHT (CRÍTICO)
app.options('*', cors());

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/api', addressRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/orders', orderRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));