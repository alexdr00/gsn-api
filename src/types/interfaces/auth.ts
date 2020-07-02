interface AuthCommon {
  email: string,
}

export interface SignUpBody extends AuthCommon {
  name: string,
  password: string,
}
