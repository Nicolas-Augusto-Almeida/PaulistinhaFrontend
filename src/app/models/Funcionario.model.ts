export interface Funcionario {
  id?: string;
  nome: string;
  cpf: string;
  cargo: string;
  telefone: string;
  endereco?: string;
}

export interface Cargo {
  nomeCargo: string;
}
