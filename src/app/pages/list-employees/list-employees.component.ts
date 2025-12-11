import { Component, inject } from '@angular/core';
import { Funcionario } from '../../models/Funcionario.model';
import { FuncionarioService } from '../../services/funcionario.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-employees',
  standalone: false,
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.css',
})
export class ListEmployeesComponent {
  funcionarios: Funcionario[] = [];
  funcionariosFiltrados: Funcionario[] = [];

  private funcionarioService = inject(FuncionarioService);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  carregarFuncionarios() {
    this.funcionarioService.listarFuncionarios().subscribe({
      next: (dados) => {
        this.funcionarios = dados;

        this.funcionariosFiltrados = dados;
        console.log('Dados recebidos:', dados);
      },
      error: (erro) => {
        console.error('Erro ao buscar funcionários', erro);
      },
    });
  }

  excluirFuncionario(id: string) {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.funcionarioService.deletarFuncionario(id).subscribe({
        next: () => {
          this.carregarFuncionarios();
          alert('Funcionário excluído com sucesso!');
        },
        error: (erro) => {
          console.error('Erro ao excluir', erro);
          alert('Erro ao excluir funcionário.');
        },
      });
    }
  }

  editarFuncionario(cpf: string) {
    this.router.navigate(['/gerente/edit-funcionario', cpf]);
  }

  filtrar(event: Event) {
    const input = event.target as HTMLInputElement;
    const valor = input.value.toLowerCase();

    if (!valor) {
      this.funcionariosFiltrados = this.funcionarios;
      return;
    }

    this.funcionariosFiltrados = this.funcionarios.filter((func) => {
      const nome = (func.nome || '').toLowerCase();

      const cpf = func.cpf || '';
      const nomeCargo = (func.cargo?.nomeCargo || '').toLowerCase();

      return (
        nome.includes(valor) || cpf.includes(valor) || nomeCargo.includes(valor)
      );
    });
  }

  cadastroFuncionario() {
    const role = this.authService.getRole();
    console.log('Role atual:', role);

    if (!role) {
      console.error('Nenhum role encontrado. Usuário não está logado.');
      return;
    }

    if (role === 'ROLE_GERENTE') {
      this.router.navigate(['/gerente/add-funcionario']);
    } else {
      console.warn('Cargo não autorizado:', role);
    }
  }
}
