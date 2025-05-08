import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
//import centralizedErrorHandler from './middleware/error_handling/error_handler.cjs'; // Keeping this .cjs since it's CommonJS
import registerUser from './api/routes/register/register.js'
import loginUser from './api/routes/login/login.js'
import getPortfolio from './api/routes/operations/getPortfolio.js'
import upload from './api/routes/token/upload.js'
import getToken from './api/routes/token/getToken.js'


const app = express();

const frontendURL = process.env.FRONTEND_URL;

const allowedOrigins = [
    frontendURL,
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Allow requests with no origin (e.g., mobile apps)
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Explicitly handle preflight (OPTIONS) requests
//app.options(frontendURL, cors());

// Resource headers middleware
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Load routes
app.use('/register', registerUser)
app.use('/login', loginUser)
app.use('/get-portfolio', getPortfolio)
app.use('/token', upload)
app.use('/get-value', getToken)


//app.use(centralizedErrorHandler);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
