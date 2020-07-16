import fetch from 'node-fetch';
import jwkToPem from 'jwk-to-pem';
import jwt, { VerifyOptions } from 'jsonwebtoken';
import verror from '../proxies/verror';
import StepErrors from '../constants/errors/steps';
import { Session } from '../types/interfaces/session';

async function decodeBearerToken(bearerToken: string, options: VerifyOptions = {}): Promise<Session> {
  try {
    const idToken = bearerToken.slice(7, bearerToken.length);
    const jwksUrl = process.env.JWKS_URL as string;
    const jwksResponse = await fetch(jwksUrl);
    const jwks = await jwksResponse.json();
    const jwkForIdToken = jwks.keys[0];
    const jwkPem = jwkToPem(jwkForIdToken);
    const verifyOptions: VerifyOptions = { algorithms: ['RS256'], ...options };

    return new Promise((resolve) => {
      jwt.verify(idToken, jwkPem, verifyOptions, (error, decodedToken) => {
        if (error) {
          throw error;
        }

        resolve(decodedToken as Session);
      });
    });
  } catch (error) {
    throw verror.createError({
      name: StepErrors.DecodeBearerToken.name,
      message: StepErrors.DecodeBearerToken.message,
      cause: error,
      debugParams: { options },
    });
  }
}

export default decodeBearerToken;
