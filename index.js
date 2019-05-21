const express = require('express');
const app = express();
const campaign = require('./campaign');

app.use(express.json());


app.get('/api/campaigns', (req, res) => {
    campaign.getCampagins(req, res);
});

app.get('/api/campaigns/:name', (req, res) => {
    campaign.getCampagin(req, res);
});

app.post('/api/campaigns', (req, res) => {
   campaign.createCampaign(req,res);
});

app.put('/api/campaigns/:name', (req, res) => {
    campaign.updateCampaign(req,res);
});

// PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));