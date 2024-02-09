// App.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
require('dotenv').config();

const generateSpacesRoute = require('./routes/EventmanagementRoute');
const fetchDatafromDB = require('./routes/FetchdBRout'); // Import the router file

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://lylia:Q9MFU4dIajWfVZVC@auth.zrptolx.mongodb.net/?retryWrites=true&w=majority");

app.use('/api', generateSpacesRoute);
app.use('/api/fetch', fetchDatafromDB); // Use the router file as middleware

app.listen(5000, () => {
  console.log('Connected to MongoDB');
});
