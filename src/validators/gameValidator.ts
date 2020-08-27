import Joi from '../proxies/joi';
import { GameSearchQueryParams } from '../types/interfaces/game';
import gameConstants from '../constants/gameConstants';
import { RawgGame } from '../types/interfaces/rawg';

const maxAllowed = gameConstants.MAX_RESULTS_PER_PAGE_ALLOWED;

const gameSerchQueryParamsSchema = Joi.object({
  searchQuery: Joi.string(),
  resultsPerPage: Joi.number().positive().max(maxAllowed).message(`We can only show max of ${maxAllowed} games per page`),
});

const platformSchema = Joi.object({
  id: Joi.number().integer().positive(),
  name: Joi.string(),
  slug: Joi.string(),
});

const followBodySchema = Joi.object({
  name: Joi.string().required(),
  background_image: Joi.string().uri(),
  platforms: Joi.array().has(Joi.object({ platform: platformSchema })),
  id: Joi.number().integer().positive().required(),
});

class GameValidator {
  public rawgSearch(gameSearchQueryParams: GameSearchQueryParams) {
    const validation = gameSerchQueryParamsSchema.validate(gameSearchQueryParams);

    if (validation.error) {
      throw validation.error;
    }

    return validation.value;
  }

  public follow(followGameBody: RawgGame) {
    const validation = followBodySchema.validate(followGameBody, {
      allowUnknown: true,
    });

    if (validation.error) {
      throw validation.error;
    }

    return validation.value;
  }
}

export default new GameValidator();
