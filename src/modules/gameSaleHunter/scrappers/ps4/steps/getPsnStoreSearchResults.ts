import jsdom from 'jsdom';
import verror from '../../../../../proxies/verror';
import StepErrors from '../../../../../constants/errors/steps';
import { PsnStoreSearchResults } from '../../../../../types/interfaces/gameSaleHunter';
import puppeteer = require('puppeteer');

const { JSDOM } = jsdom;

async function getPsnStoreSearchResults(searchResultsUrl: string): Promise<PsnStoreSearchResults[]> {
  try {
    const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser', args: ['--no-sandbox'], headless: true });
    const page = await browser.newPage();
    await page.goto(searchResultsUrl);
    const pageMarkup = await page.content();
    const dom = new JSDOM(pageMarkup);
    // const page = await JSDOM.fromURL(searchResultsUrl);
    const { document } = dom.window;

    const resultTileLinks = document.querySelectorAll('.ems-sdk-product-tile-link');
    const resultTileLinksIterable = Array.from(resultTileLinks);

    let searchResults = resultTileLinksIterable.map((tileLink) => {
      const gameNameElement = tileLink.querySelector('span[data-qa="ems-sdk-product-tile-name"]');
      const gamePriceElement = tileLink.querySelector('span[data-qa="ems-sdk-product-tile-price"]');
      const gameStrikedPriceElement = tileLink.querySelector('strike.price--strikethrough');
      const searchResult = {} as PsnStoreSearchResults;

      if (gameNameElement && gamePriceElement) {
        searchResult.name = gameNameElement.textContent;
        searchResult.price = gamePriceElement.textContent;
        searchResult.strikedPrice = gameStrikedPriceElement?.textContent;
      }

      return searchResult;
    });

    searchResults = searchResults.filter((searchResult) => searchResult.name && searchResult.price);
    return searchResults;
  } catch (error) {
    throw verror.createError({
      name: StepErrors.GetPsnStoreSearchResults.name,
      message: StepErrors.GetPsnStoreSearchResults.message,
      cause: error,
      debugParams: { searchResultsUrl },
    });
  }
}


export default getPsnStoreSearchResults;
