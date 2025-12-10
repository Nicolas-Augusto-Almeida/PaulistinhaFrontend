export interface authLoginRequest {
  cpf: string;
  senha: string;
}

export interface authLoginResponse {
  cpf: string;
  role: string;
}
