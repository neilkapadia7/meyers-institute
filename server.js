const express = require('express');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
require("dotenv").config();
require("module-alias/register");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
	res.json({ msg: 'Welcome to the API' });
});

app.use(fileUpload());

app.use('/api/admin', require('./routes/admin'));
app.use('/api/admin/auth', require('./routes/adminauth'));
app.use('api/admin/attendance', require('./routes/attendance'));
app.use('/api/admin/upload', require('./file'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/guest', require('./routes/guest'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server Started on Port Number: ${PORT}`));
