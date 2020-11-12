import stringSimilarity from 'string-similarity';
import verror from '../../../../proxies/verror';
import StepErrors from '../../../../constants/errors/steps';
import { GamePrice } from '../../../../types/interfaces/gameSaleHunter';

const specialCharactersToRemove = ['™', '®'];

function getGameFromResultsBestMatch(providedGameName: string, searchResults: GamePrice[]): GamePrice | {} {
  try {
    let bestMatch = {};

    if (searchResults.length) {
      const providedGameNameLowercase = providedGameName.toLowerCase();
      const resultGameNames = searchResults.map((searchResult) => searchResult.name.toLowerCase());
      const gameNamesSpecialCharsRemoved = removeSpecialCharsFromGameNames(resultGameNames);

      const bestGameResultMatch = stringSimilarity.findBestMatch(providedGameNameLowercase, gameNamesSpecialCharsRemoved);
      const bestMatchGameName = resultGameNames[bestGameResultMatch.bestMatchIndex];

      bestMatch = searchResults.find((searchResult) => searchResult.name.toLowerCase() === bestMatchGameName) as GamePrice;
    }

    return bestMatch;
  } catch (error) {
    throw verror.createError({
      name: StepErrors.GetGameFromResultsBestMatch.name,
      message: StepErrors.GetGameFromResultsBestMatch.message,
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

export default getGameFromResultsBestMatch;
