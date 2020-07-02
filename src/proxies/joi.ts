import Joi from '@hapi/joi';

export default Joi.defaults((schema) => (
  schema.options({
    abortEarly: false,
  })
));
