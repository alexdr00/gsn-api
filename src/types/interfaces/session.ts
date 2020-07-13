export interface Tokens {
  idToken: string,
  refreshToken: string,
}

export interface Session {
  sub: string,
  aud: string,
  email_verified: boolean,
  event_id: string,
  token_use: string,
  auth_time: number,
  iss: string,
  name: string,
  'cognito:username': string,
  exp: number,
  iat: number,
  email: string
}

export interface SessionPayload {
  session: Session
  tokens: Tokens
}
