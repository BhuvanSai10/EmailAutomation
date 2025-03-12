const express = require('express');
const cors = require('cors');
const routes = require('./routes/route.js'); 
const connectDB = require('./config/db.js');
const schedule = require('node-schedule');
const { sendScheduledEmails } = require('./controller/scheduleController');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors());
app.use('/api', routes); 

schedule.scheduleJob('*/1 * * * *', sendScheduledEmails);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});