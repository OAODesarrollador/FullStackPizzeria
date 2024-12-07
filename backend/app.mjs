import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import * as usuarioRoutes from './Rutas/usuarioRoutes';
import * as tareaRoutes from './Rutas/tareaRoutes';
import * as pedidoRoutes from './Rutas/pedidoRoutes';

//// Configuración de CORS
//const corsOptions = {
//    origin: 'https://fullstackpizzeria-front.onrender.com', // Cambiar esto por la URL del frontend en Render
//    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//    credentials: true,
//};

//app.use(cors(corsOptions));
import express from 'express';
import cors from 'cors';



// Configuración de CORS
const corsOptions = {
  origin: [
    'https://fullstackpizzeria-front.onrender.com', // Tu URL de frontend
    'http://localhost:3000' // Para desarrollo local
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));



/// fin cors


dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());  // Permite comunicación entre backend y frontend
app.use(express.json());  // Parseo de JSON en las peticiones

// Middlewares
app.use((req, res, next) => {
  console.log(`Solicitud entrante: ${req.method} ${req.url}`);
  next();
});

// Rutas
app.use('/usuario', usuarioRoutes.default);
app.use('/tarea', tareaRoutes.default);
app.use('/pedido', pedidoRoutes.default);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});