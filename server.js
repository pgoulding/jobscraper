const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });


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
    return nightmare
      .goto(link)
      .wait('.desc_text_paragraph ')
      .evaluate(() => {
        var jobDescription = document.querySelector('.desc_text_paragraph');
        return jobDescription.innerHTML
      })
      .end()
      .then(results => {
        res.status(200).json({ results })
      })
      .catch(error => res.status(404).json({ error }))
})