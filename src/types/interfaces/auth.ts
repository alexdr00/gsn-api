interface AuthCommon {
  email: string,
}

export interface SignUpBody extends AuthCommon {
  name: string,
  password: string,
}

export interface SignInBody extends AuthCommon {
  password: string,
}
