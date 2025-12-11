export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: Categoria;
  quantidade: number;
}

export interface Categoria {
  nomeCategoria: string;
}
