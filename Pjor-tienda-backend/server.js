const express = require('express');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const addressRoutes = require('./routes/addressRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// 🔥 CORS MANUAL (SOLUCIÓN DEFINITIVA)
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (
    origin?.includes('vercel.app') ||
    origin === 'http://localhost:5173'
  ) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // 🔥 RESPUESTA INMEDIATA A PREFLIGHT
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// 🔥 JSON después de CORS
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