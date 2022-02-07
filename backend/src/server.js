const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use('/auth', require('./routes/auth'));
app.use('/orders', require('./routes/orders'));
app.use('/products', require('./routes/products'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`localhost:${PORT}`);
});