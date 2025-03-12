const mongoose = require('mongoose');

const scheduledEmailSchema = new mongoose.Schema({
  from:String,
  to: String,
  subject: String,
  body: String,
  scheduledTime: Date,
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending',
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('ScheduledEmail', scheduledEmailSchema);