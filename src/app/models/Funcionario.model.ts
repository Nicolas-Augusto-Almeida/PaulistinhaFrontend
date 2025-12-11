export interface Funcionario {
  id?: string;
  nome: string;
  cpf: string;
  cargo: Cargo;
  telefone: string;
  endereco?: string;
}

export interface Cargo {
  nomeCargo: string;
}
