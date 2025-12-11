export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  quantidade: number;

  quantidadeInput?: number;
}

export interface Categoria {
  nomeCategoria: string;
}
