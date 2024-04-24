const express = require('express');
const app = express();
const {readdirSync} = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

app.use(morgan('dev'));

app.use(cors());

app.use(bodyParser.json({limit:'10mb'}));



readdirSync('./Routes').map((r)=> app.use('/api',require('./Routes/'+r)));


connectDB();

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})