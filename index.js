const express = require('express');
const app = express();
const campaign = require('./routes/campaign');


app.use(express.json());
app.use('/api/campaigns',campaign);











// PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));