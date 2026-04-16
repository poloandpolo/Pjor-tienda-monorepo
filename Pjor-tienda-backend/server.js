const express = require('express');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const addressRoutes = require('./routes/addressRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// 🔥 CORS ROBUSTO (dinámico + seguro)
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Permitir localhost y cualquier vercel.app
  if (
    origin === 'http://localhost:5173' ||
    origin?.endsWith('.vercel.app')
  ) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Vary', 'Origin'); // 🔥 IMPORTANTE para proxies

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,DELETE,OPTIONS'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  // ⚠️ SOLO si realmente usas cookies / sesiones
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // 🔥 RESPUESTA PRE-FLIGHT SIEMPRE
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
});

app.use(express.json());

// 🔥 HEALTH CHECK (útil en Render)
app.get('/', (req, res) => {
  res.send('Backend vivo');
});

// Rutas
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/api', addressRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/orders', orderRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});