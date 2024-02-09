const express = require('express');
const app = express();


const eventRoutes = require('./eventroutes');
const participantRoutes = require('./participantRoutes');
const leadRoutes = require('./leadRoutes');
const mentorRoutes = require('./mentorRoutes');
const judgeRoutes = require('./judgeRoutes');
const submissionRoutes = require('./submissionRoutes');


app.use('/events', eventRoutes);
app.use('/participants', participantRoutes);
app.use('/leads', leadRoutes);
app.use('/mentors', mentorRoutes);
app.use('/judges', judgeRoutes);
app.use('/submissions', submissionRoutes);

module.exports = app;
