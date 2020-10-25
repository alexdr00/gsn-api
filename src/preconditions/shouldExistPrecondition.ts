import verror from '../proxies/verror';
import { ErrorResponseNames } from '../types/enums/Errors';

function shouldExistPrecondition<T>(resourceToCheck: T, resourceName: string) {
  const name = ErrorResponseNames.NotFound;
  const message = `${resourceName} not found`;

  if (resourceToCheck === null || resourceToCheck === undefined) {
    throw verror.createError({ name, message });
  }
}

export default shouldExistPrecondition;
