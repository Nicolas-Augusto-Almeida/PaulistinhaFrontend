import { Component, inject } from '@angular/core';
import { Funcionario } from '../../models/Funcionario.model';
import { FuncionarioService } from '../../services/funcionario.service';
import { Router } from '@angular/router';

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
  private Router = inject(Router);

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

  editarFuncionario(id: string) {}

  filtrar(event: Event) {
    const input = event.target as HTMLInputElement;
    const valor = input.value.toLowerCase();

    if (!valor) {
      this.funcionariosFiltrados = this.funcionarios;
      return;
    }

    this.funcionariosFiltrados = this.funcionarios.filter((func) => {
      return (
        func.nome.toLowerCase().includes(valor) ||
        func.cpf.includes(valor) ||
        func.cargo.toLowerCase().includes(valor)
      );
    });
  }
}
