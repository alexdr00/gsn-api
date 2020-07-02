// import AWS from 'aws-sdk';
import fetch from 'node-fetch';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import BaseAWSConfig from './BaseAWSConfig';
import { SignUpBody } from '../../types/interfaces/auth';

// @ts-ignore
global.fetch = fetch;

class Cognito extends BaseAWSConfig {
  private userPool: AmazonCognitoIdentity.CognitoUserPool;

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
          reject(err);
        }

        resolve(result);
      });
    });
  }
}

export default new Cognito();
