import { Component, inject, OnInit } from '@angular/core';
import { CargoService } from '../../services/cargo.service';
import { Cargo } from '../../models/Funcionario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from '../../services/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: false,
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  private cargoService = inject(CargoService);
  private funcionarioService = inject(FuncionarioService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = false;
  funcionarioCpf: string | null = null;
  funcionarioId: string | null = null;

  employeeForm!: FormGroup;

  cargos: Cargo[] = [];

  ngOnInit(): void {
    this.funcionarioCpf = this.route.snapshot.paramMap.get('cpf');

    if (this.funcionarioCpf) {
      this.isEditMode = true;
      this.carregarDadosFuncionario(this.funcionarioCpf);
    }

    this.carregarCargos();
    this.employeeForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      cargo: ['', Validators.required],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required],
      senha: [''],
    });
  }

  carregarDadosFuncionario(cpf: string) {
    this.funcionarioService.buscarPorCpf(cpf).subscribe({
      next: (funcionario) => {
        this.employeeForm.patchValue({
          nome: funcionario.nome,
          cpf: funcionario.cpf,
          cargo: funcionario.cargo,
          telefone: funcionario.telefone,
          endereco: funcionario.endereco,
        });
        this.employeeForm.get('senha')?.clearValidators();
        this.employeeForm.get('senha')?.updateValueAndValidity();
        this.funcionarioId = funcionario.id || null;
      },
      error: (err) => console.error('Erro ao carregar funcionário', err),
    });
  }

  carregarCargos() {
    this.cargoService.listarCategorias().subscribe({
      next: (data) => {
        this.cargos = data;
        console.log(data);
      },
    });
  }

  salvar() {
    if (this.employeeForm.invalid) return;

    const dados = this.employeeForm.value;

    if (this.isEditMode && this.funcionarioId) {
      this.funcionarioService
        .atualizarFuncionario(this.funcionarioId, dados)
        .subscribe({
          next: () => {
            alert('Funcionário atualizado com sucesso!');
            this.router.navigate(['/gerente/funcionarios']);
          },
          error: (err) => alert('Erro ao atualizar.'),
        });
    } else {
      this.funcionarioService.criarFuncionario(dados).subscribe({
        next: () => {
          alert('Funcionário criado com sucesso!');
          this.router.navigate(['/gerente/funcionarios']);
        },
        error: (err) => alert('Erro ao criar.'),
      });
    }
  }
}
