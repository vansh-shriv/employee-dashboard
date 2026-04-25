require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Server is running');
});

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DBNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL successfully'))
  .catch((err) => console.error('Database connection error', err.stack));

// Basic health check route
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const employeeRoutes = require('./routes/employeeRoutes');
app.use('/api', employeeRoutes);

app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
