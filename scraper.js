const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });

const webScraper = (link) => {
  return nightmare
    .goto(link)
    .wait('.desc_text_paragraph ')
    .evaluate(() => {
      var jobDescription = document.querySelector('.desc_text_paragraph');
      return jobDescription.innerHTML
    })
    .end()
    .then((result) => {
      return result
    })
    .catch((error) => {
      return console.error('Search failed:', error);
    });
}

module.exports = webScraper;