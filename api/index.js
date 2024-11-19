const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());

const MONGO_URI = "mongodb+srv://coldplay:coldplay6969@coldplay.zlm9c.mongodb.net/?retryWrites=true&w=majority"
 // Use environment variable for MongoDB connection
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// Define the schema and model
const RegistrationSchema = new mongoose.Schema({
  name: String,
  whatsapp: String,
  address: String,
  email: String,
  age: Number,
});

const Registration = mongoose.model('Registration', RegistrationSchema);

// Define API route
app.post('/register', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register.' });
  }
});

// Fallback route
app.get('/', (req, res) => {
  res.send('API is working');
});

module.exports = app;
