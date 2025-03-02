const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware  
app.use(cors());
app.use(express.json());


app.use(cors({
    origin: ['http://localhost:3000', 'https://loquacious-manatee-f2c86e.netlify.app/']
}));

// Routes  
const hospitalRoutes = require('./routes/hospitalRoutes');
app.use('/api/v1/hospitals', hospitalRoutes);

// Database connection  
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});