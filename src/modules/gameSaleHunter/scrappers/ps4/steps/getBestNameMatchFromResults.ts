import stringSimilarity from 'string-similarity';
import verror from '../../../../../proxies/verror';
import StepErrors from '../../../../../constants/errors/steps';
import { PsnStoreSearchResult } from '../../../../../types/interfaces/gameSaleHunter';

const specialCharactersToRemove = ['™', '®'];

function getBestNameMatchFromResults(providedGameName: string, searchResults: PsnStoreSearchResult[]): PsnStoreSearchResult | {} {
  try {
    let bestGameMatch;

    if (searchResults.length) {
      const providedGameNameLowercase = providedGameName.toLowerCase();
      const resultGameNames = searchResults.map((searchResult) => searchResult.name.toLowerCase());
      const gameNamesSpecialCharsRemoved = removeSpecialCharsFromGameNames(resultGameNames);

      const bestGameMatchResult = stringSimilarity.findBestMatch(providedGameNameLowercase, gameNamesSpecialCharsRemoved);
      const bestGameMatchName = resultGameNames[bestGameMatchResult.bestMatchIndex];

      bestGameMatch = searchResults.find((searchResult) => searchResult.name.toLowerCase() === bestGameMatchName);
    } else {
      bestGameMatch = {};
    }

    return bestGameMatch!;
  } catch (error) {
    throw verror.createError({
      name: StepErrors.GetPsnGameUrlFromSearchResults.name,
      message: StepErrors.GetPsnGameUrlFromSearchResults.message,
      cause: error,
      debugParams: { providedGameName, searchResults },
    });
  }

  function removeSpecialCharsFromGameNames(resultGameNames: string[]): string[] {
    return resultGameNames.map((gameName: string) => {
      const specialCharsToRemoveJoined = specialCharactersToRemove.join(',');
      const regexSpecialCharsToRemove = new RegExp(`[${specialCharsToRemoveJoined}]`, 'g');
      return gameName.replace(regexSpecialCharsToRemove, '');
    });
  }
}

export default getBestNameMatchFromResults;
