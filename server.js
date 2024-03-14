const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/resolveImage', async (req, res) => {
    const { imageUrl } = req.query;
    
    if (!imageUrl) {
        return res.status(400).send('No imageUrl query parameter provided.');
    }

    try {
        const response = await fetch(imageUrl, {
            method: 'GET',
            redirect: 'follow'
        });

        // The actual image URL is where the request eventually ends up.
        const actualImageUrl = response.url;

        res.json({ actualImageUrl });
    } catch (error) {
        console.error('Error fetching image URL:', error);
        res.status(500).send('Failed to fetch image URL.');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
