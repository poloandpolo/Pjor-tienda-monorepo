const express = require('express');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const addressRoutes = require('./routes/addressRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// 🔥 LOG GLOBAL (CRÍTICO)
app.use((req, res, next) => {
  console.log('➡️', req.method, req.url);
  next();
});

// 🔥 HEALTH CHECK (CRÍTICO)
app.get('/', (req, res) => {
  res.send('Backend vivo');
});

// 🔥 CORS ULTRA SIMPLE (SIN CONDICIONES)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    console.log('⚡ OPTIONS interceptado');
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

// Rutas
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/api', addressRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/orders', orderRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en puerto ${PORT}`);
});