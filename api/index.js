const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI; // Use environment variable for MongoDB connection
const PORT = process.env.PORT || 3000;

// Connect to MongoDB with enhanced error handling
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit process if MongoDB connection fails
  });

// Define the schema and model
const RegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  whatsapp: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true, min: 18 },
});

const Registration = mongoose.model('Registration', RegistrationSchema);

// Define API route
app.post('/register', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ error: 'Failed to register. Please try again.' });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('API is working');
});

module.exports = app;
