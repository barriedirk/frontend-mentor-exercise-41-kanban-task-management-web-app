export interface SignupPayload {
  username: string;
  email: string;
  password: string;
}

export interface SigninPayload {
  identifier: string;
  password: string;
}

export interface SigninResponse {
  jwt: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
}
