const express = require('express');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const addressRoutes = require('./routes/addressRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productsRoutes = require('./routes/productRoutes'); // 🔥 NUEVO
const departmentRoutes = require('./routes/departmentRoutes');


const app = express();

// 🔥 CORS ROBUSTO
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (
    origin === 'http://localhost:5173' ||
    origin?.endsWith('.vercel.app')
  ) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Vary', 'Origin');

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,DELETE,OPTIONS'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
});

app.use(express.json());

// 🔥 HEALTH CHECK
app.get('/', (req, res) => {
  res.send('Backend vivo');
});

// =======================
// ROUTES
// =======================
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.use('/api', addressRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/orders', orderRoutes);

app.use('/api/products', productsRoutes); // 🔥 NUEVO ENDPOINT
app.use('/api/departments', departmentRoutes);

// =======================
// PORT
// =======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});