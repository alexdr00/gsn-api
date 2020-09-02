import Joi from '../proxies/joi';
import gameConstants from '../constants/gameConstants';


export const filterParamsValidator = Joi.object({
  searchQuery: Joi.string(),
  page: Joi.number().integer().positive(),
  limit: Joi.number().integer().max(gameConstants.MAX_RESULTS_PER_PAGE_ALLOWED).positive(),
  sortBy: Joi.string().valid('ASC', 'DESC'),
});
