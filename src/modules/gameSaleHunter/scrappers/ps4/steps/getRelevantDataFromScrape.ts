import verror from '../../../../../proxies/verror';
import StepErrors from '../../../../../constants/errors/steps';
import { ScrappedPsnStoreSearchResult, PsnStoreSearchResult } from '../../../../../types/interfaces/gameSaleHunter';

function getRelevantDataFromScrape(scrappedPsnStoreSearchResults: ScrappedPsnStoreSearchResult[]): PsnStoreSearchResult[] {
  try {
    const psnStoreSearchResults = scrappedPsnStoreSearchResults.filter((scrappedStoreSearchResult) => {
      const hasNecessaryData = scrappedStoreSearchResult.name && scrappedStoreSearchResult.price;
      const isPs4Platform = scrappedStoreSearchResult?.platform === 'PS4';

      return hasNecessaryData && isPs4Platform;
    }) as PsnStoreSearchResult[];

    return psnStoreSearchResults;
  } catch (error) {
    throw verror.createError({
      name: StepErrors.GetRelevantDataFromScrape.name,
      message: StepErrors.GetRelevantDataFromScrape.message,
      cause: error,
      debugParams: { scrappedPsnStoreSearchResults },
    });
  }
}


export default getRelevantDataFromScrape;
