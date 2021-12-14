const express = require('express');
const authRoutes = require('./routes/authRoutes');
const partRoutes = require('./routes/partRoutes');
const cartRoutes = require('./routes/cartRoutes');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');    


const app = express();

const connectionString = '<insert connection string here>';
mongoose.connect(connectionString)
    .then(result => {
        app.listen(8000);
        console.log('connected to db');
    })
    .catch(err => {
        console.log(err)
    })
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());


app.use(authRoutes);
app.use(partRoutes);
app.use(cartRoutes);
