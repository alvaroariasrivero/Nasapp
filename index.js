require('dotenv').config();
const express = require('express');
const path = require('path');
const landingsApi = require('./controllers/landingsApi');
const neasApi = require('./controllers/neasApi');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

require('./utils/dbmongo');

app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.get('/api/astronomy/landings', landingsApi.getLandingByQuery)
app.get('/api/astronomy/landings/mass/:mass?', landingsApi.getLandingByMass)
app.get('/api/astronomy/landings/class/:recclass?', landingsApi.getLandingByClass)
app.get('/api/astronomy/neas', neasApi)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });