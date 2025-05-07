import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';

const password =  process.env.DB_ROOT_PASSWORD
const dbUser = process.env.DB_ROOT_USER
const dbName = process.env.DB_NAME
const dbHost = process.env.DB_HOST



// Create MySQL connection
export const db = mysql.createPool({
    host: 'localhost',
    user: dbUser,
    password: password,
    database: dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  
