require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err))

app.use('/api', routes);

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
