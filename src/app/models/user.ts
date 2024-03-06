export enum AuthenticationProvider {
  Local = 'LOCAL',
  Google = 'GOOGLE'
}

export interface UserRegisterRequest {
  provider: AuthenticationProvider
  email: string
  password: string
}

export interface UserRegisterError {
  status: number;
  message: string;
  suggestLogin: boolean;
}

export interface UserLoginError {
  message: string;
}

export interface UserLoginRequest {
  provider: AuthenticationProvider;
  username: string;
  password: string;
}

export interface AccessToken {
  access_token: string;
}

export interface UserDetails {
  id: number;
  admin: boolean;
  email: string;
  hasCourseAccess: boolean;
  aboutYouCompleted: boolean;
}

export interface AboutYouForm {
  type: string;
  placement: string;
  howQuickly: string;
  why: string;
  relocate: string;
}

export interface UserPasswordResetRequest {
  email: string;
}

export interface UserPasswordResetResponse {
  error?: 'external'
}

export interface UserPasswordResetSetRequest {
  code: string;
  password: string;
}
