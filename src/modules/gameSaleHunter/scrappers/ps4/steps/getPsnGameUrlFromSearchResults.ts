import stringSimilarity from 'string-similarity';
import { PsnStoreSearchResults } from './getPsnStoreSearchResults';
import verror from '../../../../../proxies/verror';
import StepErrors from '../../../../../constants/errors/steps';

const specialCharactersToRemove = ['™', '®'];

function getPsnGameUrlFromSearchResults(providedGameName: string, searchResults: PsnStoreSearchResults[]): string {
  try {
    const providedGameNameLowercase = providedGameName.toLowerCase();
    const resultGameNames = searchResults.map((searchResult) => searchResult.name);
    const gameNamesSpecialCharsRemoved = removeSpecialCharsFromGameNames(resultGameNames);

    const bestGameMatchResult = stringSimilarity.findBestMatch(providedGameNameLowercase, gameNamesSpecialCharsRemoved);
    const bestGameMatchName = resultGameNames[bestGameMatchResult.bestMatchIndex];

    const bestGameMatch = searchResults.find((searchResult) => searchResult.name === bestGameMatchName);
    return bestGameMatch!.link;
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

export default getPsnGameUrlFromSearchResults;
