import fetch from 'node-fetch';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import BaseAWSConfig from './BaseAWSConfig';
import { SignInBody, SignUpBody } from '../../types/interfaces/auth';
import verror from '../verror';

// @ts-ignore
global.fetch = fetch;

interface Tokens {
  idToken: string,
  refreshToken: string,
}

interface SessionPayload {
  session: { [key: string]: any }
  tokens: Tokens
}

class Cognito extends BaseAWSConfig {
  private readonly userPool: AmazonCognitoIdentity.CognitoUserPool;

  constructor() {
    super();
    const userPoolId = process.env.COGNITO_USER_POOL_ID || '';
    const appClientId = process.env.COGNITO_APP_CLIENT_ID || '';
    // const identityPoolId = process.env.COGNITO_IDENTITY_POOL_ID;
    // const awsRegion = this.baseAWSConfig.region;
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
          reject(verror.createError(err));
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
        onFailure: (error) => {
          reject(verror.createError(error));
        },
      });
    });
  }

  private getCognitoSessionPayload(cognitoSession: AmazonCognitoIdentity.CognitoUserSession): SessionPayload {
    const idToken = cognitoSession.getIdToken().getJwtToken();
    const { payload: session } = cognitoSession.getIdToken();
    const refreshToken = cognitoSession.getRefreshToken().getToken();
    const tokens = { refreshToken, idToken };

    return { session, tokens };
  }
}

export default new Cognito();
