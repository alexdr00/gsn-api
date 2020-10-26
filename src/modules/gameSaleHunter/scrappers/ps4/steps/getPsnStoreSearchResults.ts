import jsdom from 'jsdom';
import verror from '../../../../../proxies/verror';
import StepErrors from '../../../../../constants/errors/steps';

const { JSDOM } = jsdom;

export interface PsnStoreSearchResults {
  link: string,
  name: string
}

async function getPsnStoreSearchResults(searchResultsUrl: string): Promise<PsnStoreSearchResults[]> {
  try {
    const page = await JSDOM.fromURL(searchResultsUrl);
    const { document } = page.window;

    const resultLinks = document.querySelectorAll('.result-link');
    const resultLinksIterable = Array.from(resultLinks);

    let searchResults = resultLinksIterable.map((link) => {
      const gameLink = link.getAttribute('href');
      const gameTitle = link.querySelector('.result-title');
      const searchResult = {} as PsnStoreSearchResults;

      if (gameLink && gameTitle && gameTitle.textContent) {
        searchResult.name = gameTitle.textContent.trim().toLowerCase();
        searchResult.link = gameLink;
      }

      return searchResult;
    });

    searchResults = searchResults.filter((searchResult) => searchResult.link && searchResult.name);
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
