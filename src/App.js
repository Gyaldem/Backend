const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
require('dotenv').config();
const EventManagerCont = require('./controllers/EventManagerCont');

const generateSpacesRoute = require('./routes/EventmanagementRoute');
const fetchDatafromDB=require('./routes/FetchdBRout')
const{fetchParticipantsFromMongoDB,fetchJudgesFromMongoDB,fetchMentorsFromMongoDB,
    fetchTeamsFromMongoDB} = require('./routes/FetchdBRout')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
mongoose.connect("mongodb+srv://lylia:Q9MFU4dIajWfVZVC@auth.zrptolx.mongodb.net/?retryWrites=true&w=majority")



app.use('/', generateSpacesRoute);
app.use('/',fetchDatafromDB)
app.use('/',fetchJudgesFromMongoDB)
app.use('/',fetchMentorsFromMongoDB)
app.use('/',fetchTeamsFromMongoDB)

app.listen(5000 , ()=>
{
    console.log('Connected to MongoDB');  
})

