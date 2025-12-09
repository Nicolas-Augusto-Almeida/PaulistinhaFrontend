export interface Produto {
  id: String;
  nome: String;
  descricao: String;
  preco: number;
  categoria: Categoria;
  quantidade: number;
}

export interface Categoria {
  nomeCategoria: String;
}
