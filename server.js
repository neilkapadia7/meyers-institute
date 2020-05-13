const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
	res.json({ msg: 'Welcome to the API' });
});

app.use('/api/admin', require('./routes/admin'));
app.use('/api/admin/auth', require('./routes/adminauth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on Port Number: ${PORT}`));
