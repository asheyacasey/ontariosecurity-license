export interface UserRegisterRequest {
  username: string
  password: string
}

export interface UserRegisterError {
  message: string;
  suggestLogin: boolean;
}

export interface UserLoginError {
  message: string;
}

export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface AccessToken {
  access_token: string;
}

export interface UserDetails {
  id: number;
  email: number;
  bought: boolean;
}
