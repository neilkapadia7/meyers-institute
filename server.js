const express = require('express');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
require("dotenv").config();
require("module-alias/register");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to the API' });
});

app.use(fileUpload());

app.use('/api', require('@routes/api'));
app.use('/admin/upload', require('./file'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server Started on Port Number: ${PORT}`));
