import { Component, inject } from '@angular/core';
import { AuditLog } from '../../models/AuditLog.model';
import { AuditLogService } from '../../services/audit-log.service';

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  logs: AuditLog[] = [];
  logsFiltrados: AuditLog[] = [];

  private auditLogService = inject(AuditLogService);

  ngOnInit(): void {
    this.carregarLogs();
  }

  carregarLogs(): void {
    this.auditLogService.listarLogs().subscribe({
      next: (dados) => {
        this.logs = dados.sort(
          (a, b) =>
            new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime()
        );
        this.logsFiltrados = this.logs;
      },
      error: (err) => {
        console.error('Erro ao carregar logs', err);
        alert('Erro ao carregar o histórico de auditoria.');
      },
    });
  }

  filtrar(event: Event): void {
    const termo = (event.target as HTMLInputElement).value.toLowerCase();

    if (!termo) {
      this.logsFiltrados = this.logs;
      return;
    }

    this.logsFiltrados = this.logs.filter(
      (log) =>
        log.produtoNome.toLowerCase().includes(termo) ||
        log.funcionarioNome.toLowerCase().includes(termo)
    );
  }

  formatarAcao(acao: string): string {
    const descricoes: { [key: string]: string } = {
      ADICIONAR_ESTOQUE: 'Entrada Estoque',
      RETIRAR_ESTOQUE: 'Saída Estoque',
      CRIAR: 'Novo Produto',
      DELETAR: 'Produto Excluído',
      EDITAR: 'Dados Alterados',
    };
    return descricoes[acao] || acao.replace('_', ' ');
  }

  getBadgeClass(acao: string): string {
    const cores: { [key: string]: string } = {
      ADICIONAR_ESTOQUE: 'text-bg-success',
      RETIRAR_ESTOQUE: 'text-bg-danger',
      CRIAR: 'text-bg-primary',
      DELETAR: 'text-bg-dark',
      EDITAR: 'text-bg-warning text-dark',
    };

    return cores[acao] || 'text-bg-secondary';
  }
}
