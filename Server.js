const express = require('express');
const app = express();
const cheerio = require('cheerio'); // khai báo module cheerio

const request = require('request-promise'); // khai báo module request-promise
var URL
// URL='https://123job.vn/tuyen-dung'
URL='https://www.topcv.vn/viec-lam'
request(URL, (error, response, html) => {
  if(!error && response.statusCode == 200) {
    const $ = cheerio.load(html); // load HTML
    let job_list=$('div.el-carousel-ctn>div.row>')
    let box=$('div.row> div.col-md-4> div.feature-job-item>div.cvo-flex> div.col-title>')
    $('div.el-carousel-ctn>div.row> ').each((index,el)=>{
      var job=$(el).find('div.row> div.col-md-4> div.feature-job-item>div.cvo-flex> div.col-title>')
      console.log(job)
    })
    }
  else {
    console.log(error);
  }
});
// app.get('/',function(req,res){ 

//     res.write($);
//     return res.end();
//   })
  const port = 8080
  app.listen(port, function() {console.log(`Listening to port ${port}`)});
