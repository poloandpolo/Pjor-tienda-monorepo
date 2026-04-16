const express = require('express');
const cors = require('cors'); // Importamos el paquete cors
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const addressRoutes = require('./routes/addressRoutes'); // Importa las rutas de direcciones
const paymentRoutes = require('./routes/paymentRoutes'); // Importa las rutas de pagos
const orderRoutes = require('./routes/orderRoutes')

const app = express();

// Habilitar CORS para permitir solicitudes desde http://localhost:5173
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://pjor-tienda-monorepo.vercel.app'
  ],
  credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/api', addressRoutes); // Rutas para direcciones
app.use('/api/payments', paymentRoutes); // Rutas para pagos
app.use('/api/orders', orderRoutes);

// Configurar el puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

//@Askinga10XDxd