import stringSimilarity from 'string-similarity';
import { PsnStoreSearchResults } from './getPsnStoreSearchResults';
import verror from '../../../../../proxies/verror';
import StepErrors from '../../../../../constants/errors/steps';

function getPsnGameUrl(providedGameName: string, searchResults: PsnStoreSearchResults[]): string {
  try {
    const providedGameNameLowercase = providedGameName.toLowerCase();
    const resultGameNames = searchResults.map((searchResult) => searchResult.name);

    const bestGameMatchResult = stringSimilarity.findBestMatch(providedGameNameLowercase, resultGameNames);
    const bestGameMatchName = resultGameNames[bestGameMatchResult.bestMatchIndex];

    const bestGameMatch = searchResults.find((searchResult) => searchResult.name === bestGameMatchName);
    return bestGameMatch!.link;
  } catch (error) {
    throw verror.createError({
      name: StepErrors.GetPsnGameUrl.name,
      message: StepErrors.GetPsnGameUrl.message,
      cause: error,
      debugParams: { providedGameName, searchResults },
    });
  }
}

export default getPsnGameUrl;
