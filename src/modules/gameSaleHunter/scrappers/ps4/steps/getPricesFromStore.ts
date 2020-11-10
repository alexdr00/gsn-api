import verror from '../../../../../proxies/verror';
import StepErrors from '../../../../../constants/errors/steps';

function getPricesFromStore(): string {
  try {

  } catch (error) {
    throw verror.createError({
      name: StepErrors.GetPsnGameUrlFromSearchResults.name,
      message: StepErrors.GetPsnGameUrlFromSearchResults.message,
      cause: error,
      debugParams: { providedGameName, searchResults },
    });
  }
}

export default getPricesFromStore;
