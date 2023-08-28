require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const routes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// MongoDB Database Connection

mongoose.connect(process.env.DB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err))

// API route
app.use('/api', routes);

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
