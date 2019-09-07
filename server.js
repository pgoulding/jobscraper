const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const webScraper = require('./scraper')
const environment = process.env.NODE_ENV || 'development'

app.use(cors())
app.use(bodyParser.json())
app.use(express.json());
app.set('port', process.env.PORT || 3009);
app.locals.title = 'Web Scraper';

app.get('/', (request, response) => {
  response.send('Oh hey Mahk');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.post('/api/v1/jobdetails', (req, res) => {
  const { link } = req.body
  return webScraper(link).then(results => {
    res.status(200).json({ results, success: true })
  }).catch(error => res.send('Error: ', error))
})