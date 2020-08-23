import Joi from '../proxies/joi';
import { GameSearchQueryParams } from '../types/interfaces/game';

const MAX_RESULTS_PER_PAGE = 40;

const gameSerchQueryParamsSchema = Joi.object({
  page: Joi.number().positive(),
  searchQuery: Joi.string(),
  resultsPerPage: Joi.number().positive().max(MAX_RESULTS_PER_PAGE).message(`We can only show max of ${MAX_RESULTS_PER_PAGE} games per page`),
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
