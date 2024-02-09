const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
require('dotenv').config();
const EventManagerCont = require('./controllers/EventManagerCont');

const generateSpacesRoute = require('./routes/EventmanagementRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
mongoose.connect("mongodb+srv://lylia:Q9MFU4dIajWfVZVC@auth.zrptolx.mongodb.net/?retryWrites=true&w=majority")



app.use('/api', generateSpacesRoute);


app.listen(5000 , ()=>
{
    console.log('Connected to MongoDB');  
})

