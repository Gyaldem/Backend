const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  driveLink: {
    type: String,
    
  },
  presentationLink: {
    type: String,

  },
  githubLink: {
    type: String,
    
  },
  figmaLink: {
    type: String,
    
  },
  videoLink: {
    type: String,
   
  },
  additionalLink1: {
    type: String,
   
  },
  additionalLink2: {
    type: String,
    
  },
 
  metadata: {
    type: Object, // Add any additional metadata fields as needed
  },
  // Add references to related entities if needed
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
});


const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
