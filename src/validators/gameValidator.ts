import Joi from '../proxies/joi';
import { GameSearchQueryParams } from '../types/interfaces/game';
import gameConstants from '../constants/gameConstants';

const maxAllowed = gameConstants.MAX_RESULTS_PER_PAGE_ALLOWED;

const gameSerchQueryParamsSchema = Joi.object({
  searchQuery: Joi.string(),
  resultsPerPage: Joi.number().positive().max(maxAllowed).message(`We can only show max of ${maxAllowed} games per page`),
});

class GameValidator {
  public rawgSearch(gameSearchQueryParams: GameSearchQueryParams) {
    const validation = gameSerchQueryParamsSchema.validate(gameSearchQueryParams);

    if (validation.error) {
      throw validation.error;
    }

    return validation.value;
  }
}

export default new GameValidator();
