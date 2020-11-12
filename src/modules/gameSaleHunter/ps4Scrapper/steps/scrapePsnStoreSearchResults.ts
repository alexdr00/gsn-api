import puppeteer from 'puppeteer';
import jsdom from 'jsdom';
import verror from '../../../../proxies/verror';
import StepErrors from '../../../../constants/errors/steps';
import { puppeteerConfig } from '../../../../constants/general';
import { ScrappedPsnStoreSearchResult } from '../../../../types/interfaces/gameSaleHunter';

const { JSDOM } = jsdom;

async function scrapePsnStoreSearchResults(searchResultsUrl: string): Promise<ScrappedPsnStoreSearchResult[]> {
  try {
    const browser = await puppeteer.launch(puppeteerConfig);
    const page = await browser.newPage();
    await page.goto(searchResultsUrl, { waitUntil: 'networkidle0' });
    const pageMarkup = await page.content();
    await browser.close();
    const dom = new JSDOM(pageMarkup);
    const { document } = dom.window;

    const resultTileLinks = document.querySelectorAll('.ems-sdk-product-tile-link');
    const resultTileLinksIterable = Array.from(resultTileLinks);

    const scrapedPsnStoreSearchResults = resultTileLinksIterable.map((tileLink) => {
      const gameNameElement = tileLink.querySelector('span[data-qa="ems-sdk-product-tile-name"]');
      const gamePriceElement = tileLink.querySelector('span[data-qa="ems-sdk-product-tile-price"]');
      const gameStrikedPriceElement = tileLink.querySelector('strike.price--strikethrough');
      const gamePlatformElement = tileLink.querySelector('span[data-qa="ems-sdk-product-tile-image-badge"]');
      const searchResult = {} as ScrappedPsnStoreSearchResult;

      if (gameNameElement && gamePriceElement) {
        searchResult.name = gameNameElement.textContent;
        searchResult.price = gamePriceElement.textContent;
        searchResult.strikedPrice = gameStrikedPriceElement?.textContent;
        searchResult.platform = gamePlatformElement?.textContent;
      }

      return searchResult;
    });

    return scrapedPsnStoreSearchResults;
  } catch (error) {
    throw verror.createError({
      name: StepErrors.ScrapePsnStoreSearchResults.name,
      message: StepErrors.ScrapePsnStoreSearchResults.message,
      cause: error,
      debugParams: { searchResultsUrl },
    });
  }
}


export default scrapePsnStoreSearchResults;
