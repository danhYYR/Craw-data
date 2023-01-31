const {Builder, By, until} = require('selenium-webdriver');
const cheerio = require('cheerio'); // import cheerio
const e = require('express');
const fs=require('fs');
//
const URL='https://vn.investing.com/indices/vn-chart'

let driver = new Builder()
    .forBrowser('chrome')
    .usingServer(process.env.SELENIUM_REMOTE_URL || 'http://localhost:4444/wd/hub')
    .build();
    driver.get(URL)
    .then(()=> driver.wait(until.elementLocated(By.className("el-carousel-ctn"))))
    .then(() => driver.getTitle())
    .then((title) => {
        console.log(title);
    })
    .then(() => driver.getPageSource())
    .then((source) => {
        const $ = cheerio.load(source);
        var job_list=getjob($);
        writefile(fs,job_list)
    })
    .then(() => {
        driver.quit();
    });

    // Get data from element function
const getjob=($)=>{
    let job_list =[]
    let job_box=$('div.overviewbox')
    try {
        $('div.el-carousel-ctn>div.row>').each((index,el)=>{
    let job=$(el).find('div:nth-child(1)>div.cvo-flex>div.col-title>').attr('data-original-title')
        //console.log(job)
        job_list.push(job)
    })
    }
    catch (err){
        console.log("Have error")
    }
    return job_list
}
let writefile=(fs,data)=>{
    var file = fs.createWriteStream('test.txt');
    file.on('error', function(err) { /* error handling */ });
    data.forEach(function(v) { 
        let data_i=v+'\r\n';
        file.write(data_i); });
    file.end();
}