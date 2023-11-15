// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3001; // Choose a port for your backend

// Middleware
app.use(cors());
app.use(bodyParser.json());


// token var jwt = require('jsonwebtoken');
var FrillSSOKey = '7f2ab7ef-ca4b-45f1-96ce-80368b661647';
var userData = { 
  email: user.email,
  id: user.id,
  name: user.name,
};
var frillUserToken = jwt.sign(userData, FrillSSOKey, {algorithm: 'HS256'});


// API endpoint to handle feedback submission
app.post('/submitFeedback', async (req, res) => {
    console.log(req.body);
  try {
    // Forward feedback data to frill.co's API endpoint
    const frillCoResponse = await fetch('https://api.frill.co/submitFeedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include any required authentication headers or tokens for frill.co
      },
      body: JSON.stringify(req.body),
    });

    // Check if the request to frill.co was successful
    if (frillCoResponse.ok) {
      res.status(201).json({ message: 'Feedback submitted successfully to frill.co' });
    } else {
      console.error('Failed to submit feedback to frill.co');
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
