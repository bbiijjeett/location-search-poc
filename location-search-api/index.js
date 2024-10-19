const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS for your frontend
app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/location-suggestions', async (req, res) => {
  const { input } = req.query;
  const API_KEY = ' ';  // Your API Key here
  
  // Updated URL with 'components' to restrict to India, and 'types' as geocode for location-based results
  const URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${API_KEY}&types=geocode&components=country:IN&language=en`;

  try {
    const response = await axios.get(URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch location suggestions', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
