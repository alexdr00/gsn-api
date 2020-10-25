class Ps4Scrapper {
  public static scrapePrices(urlToScrape: string) {
    console.log(urlToScrape);
  }
}


// const puppeteer = require('puppeteer');
// const $ = require('cheerio');
//
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   // await page.goto('https://store.playstation.com/es-co/product/CUSA07511_00');
//   await page.goto('https://store.playstation.com/es-co/grid/search-game/1?query=Devil May Cry 5');
//   // await page.click('.product-image__img.product-image__img--main');
//   // await page.screenshot({ path: 'example.png' });
//   const con = await page.content();
//   console.log($('.price-display__price', con).html());
//   await browser.close();
// })();

export default Ps4Scrapper;
