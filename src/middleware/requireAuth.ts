import { NextFunction, Response, Request } from 'express';
import authService from '../services/authService';

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const originEndpoint = req.originalUrl;

  const unprotectedEndpoints = [
    '/auth/sign-in',
    '/auth/sign-up',
    // '/health',
  ];

  const isUnprotectedEndpoint = unprotectedEndpoints.find((unprotectedEndpoint) => (
    originEndpoint.includes(unprotectedEndpoint)
  ));

  if (isUnprotectedEndpoint) {
    return next();
  }

  try {
    const { authorization: bearerToken } = req.headers;

    const user = await authService.getUserSessionFromBearerToken(bearerToken, originEndpoint);
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

export default requireAuth;
