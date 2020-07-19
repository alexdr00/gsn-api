import fetch from 'node-fetch';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import BaseAWSConfig from './BaseAWSConfig';
import { SignInBody, SignUpBody } from '../../types/interfaces/auth';
import verror from '../verror';
import { SessionPayload, Session } from '../../types/interfaces/session';
import ResponseErrors from '../../constants/errors/responses';

// @ts-ignore
global.fetch = fetch;

class Cognito extends BaseAWSConfig {
  private readonly userPool: AmazonCognitoIdentity.CognitoUserPool;

  constructor() {
    super();
    const userPoolId = process.env.COGNITO_USER_POOL_ID || '';
    const appClientId = process.env.COGNITO_APP_CLIENT_ID || '';
    const poolData = { UserPoolId: userPoolId, ClientId: appClientId };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    this.userPool = userPool;
  }

  public signUp(signUpBody: SignUpBody): Promise<AmazonCognitoIdentity.ISignUpResult> {
    const { name, email, password } = signUpBody;

    const nameAttribute = { Name: 'name', Value: name };
    const cognitoNameAttribute = new AmazonCognitoIdentity.CognitoUserAttribute(nameAttribute);
    const attributeList = [cognitoNameAttribute];

    return new Promise((resolve, reject) => {
      this.userPool.signUp(email, password, attributeList, [], (err, result) => {
        if (err) {
          return reject(verror.createError(err));
        }

        resolve(result);
      });
    });
  }

  public signIn(signInBody: SignInBody): Promise<SessionPayload> {
    const { email, password } = signInBody;

    const authenticationData = { Username: email, Password: password };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData,
    );
    const userData = { Username: email, Pool: this.userPool };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (cognitoSession) => {
          const sessionPayload = this.getCognitoSessionPayload(cognitoSession);
          resolve(sessionPayload);
        },
        onFailure: (error) => reject(verror.createError(error)),
      });
    });
  }

  public refreshIdToken(refreshToken: string, email:string): Promise<SessionPayload> {
    const userData = { Username: email, Pool: this.userPool };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: refreshToken });

    return new Promise((resolve, reject) => {
      cognitoUser.refreshSession(RefreshToken, (err, result) => {
        if (err) {
          const error = { ...err };
          if (error.message === 'Refresh Token has expired') {
            error.name = ResponseErrors.SessionExpired.name;
          }
          return reject(verror.createError(error));
        }

        resolve(this.getCognitoSessionPayload(result));
      });
    });
  }

  public signOut(email:string): void {
    const userData = { Username: email, Pool: this.userPool };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    return cognitoUser.signOut();
  }

  private getCognitoSessionPayload(cognitoSession: AmazonCognitoIdentity.CognitoUserSession): SessionPayload {
    const idToken = cognitoSession.getIdToken().getJwtToken();
    const { payload } = cognitoSession.getIdToken();
    const session = payload as Session;
    const refreshToken = cognitoSession.getRefreshToken().getToken();
    const tokens = { refreshToken, idToken };

    return { session, tokens };
  }
}

export default new Cognito();
