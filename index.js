'use-strict'

const puppeteer = require('puppeteer');
const data = require('./data.json');

async function myParser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://rostender.info/region/bashkortostan-respublika/ufa?branch32=32&active_filter=YES&idParent=1');
  await page.setViewport({width: 1280, height: 720});
  const selfTarget = await page.evaluate(() => {
    $("a").attr("target","_self");
  });
  await page.click('body > div.b-mainClass > div.b-nav-intro > div:nth-child(2) > div.table-constructor > div:nth-child(2) > div.row > div.column.col-lg-5.tender-info-column > div > div:nth-child(2) > div > div');
  await page.waitFor(1000);
  const result = await page.evaluate(() => {
    let number = document.querySelector('i').innerText;
    let titles = document.querySelectorAll('strong');
    let name = titles[0].innerText;
    let price = titles[1].innerText;
    let region = titles[2].innerText;
    let place = titles[3].innerText;
    let endDate = titles[4].innerText;
    let curUrl = location.href;

    return {
        number,
        name,
        price,
        region,
        place,
        endDate,
        curUrl
    }

}); 


  await browser.close();
  return result;
}

myParser().then((value)=>{
console.log(value);
});
