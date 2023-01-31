const cheerio = require('cheerio');

const request = require('request-promise');

request('https://123job.vn/tuyen-dung', (error, response, html) => {
  if(!error && response.statusCode == 200) {
    const $ = cheerio.load(html); // load HTML

    $('.job__list-item').each((index, el) => { // lặp từng phần tử có class là job__list-item
      const job = $(el).find('.job__list-item-title a').text(); // lấy tên job, được nằm trong thẻ a < .job__list-item-title

      console.log(job);
    })
  }
  else {
    console.log(error);
  }
});
