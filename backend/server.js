const express = require('express');
const cors = require('cors'); 
const appRoute = require('./routes/route.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); 
app.use('/api', appRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});