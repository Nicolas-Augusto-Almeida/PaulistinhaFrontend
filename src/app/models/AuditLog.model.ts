export interface AuditLog {
  id: string;
  acao:
    | 'ADICIONAR_ESTOQUE'
    | 'RETIRAR_ESTOQUE'
    | 'CRIAR'
    | 'DELETAR'
    | 'EDITAR'
    | string;
  produtoId: string;
  produtoNome: string;
  quantidadeAlterada: number;

  funcionarioId: string;
  funcionarioNome: string;
  funcionarioCpf: string;

  descricao: string;
  dataHora: string;
}
