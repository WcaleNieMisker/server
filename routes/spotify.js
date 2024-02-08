const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/', async (req, res) => {
    try {
        const userName = process.env.LFMUSERNAME;
        const apiKey = process.env.LFMAPIKEY;
        
        const lastfmResponse = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${userName}&api_key=${apiKey}&limit=1&nowplaying=true&format=json`);

        if (lastfmResponse.status === 200) {
            res.json(lastfmResponse.data);
        } else {
            throw new Error('Last.fm API request failed');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
