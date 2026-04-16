const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const Ward = require('./models/ward');
require("dotenv").config({
  path: path.join(__dirname, ".env")
});


const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

//connection to mongo

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then
(() => console.log(" Connected to MongoDB"))
.catch((err) => console.error(" MongoDB connection error:", err));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/wards', async (req, res) => {
  try {
    const wards = await Ward.find().sort({ createdAt: -1 });
    res.json(wards);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load wards' });
  }
});

app.post('/api/wards', async (req, res) => {
  try {
    const { name, prn, subject } = req.body;

    if (!name || !prn || !subject) {
      return res.status(400).json({ message: 'Name, PRN, and subject are required' });
    }

    const ward = await Ward.create({ name, prn, subject });
    res.status(201).json(ward);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save ward' });
  }
});

app.put('/api/wards/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, prn, subject } = req.body;

    if (!name || !prn || !subject) {
      return res.status(400).json({ message: 'Name, PRN, and subject are required' });
    }

    const updatedWard = await Ward.findByIdAndUpdate(
      id,
      { name, prn, subject },
      { new: true, runValidators: true }
    );

    if (!updatedWard) {
      return res.status(404).json({ message: 'Ward not found' });
    }

    res.json(updatedWard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update ward' });
  }
});

app.delete('/api/wards/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWard = await Ward.findByIdAndDelete(id);

    if (!deletedWard) {
      return res.status(404).json({ message: 'Ward not found' });
    }

    res.json({ message: 'Ward deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete ward' });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
