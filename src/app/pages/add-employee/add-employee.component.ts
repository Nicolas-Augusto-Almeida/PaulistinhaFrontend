import { Component, inject, OnInit } from '@angular/core';
import { CargoService } from '../../services/cargo.service';
import { Cargo } from '../../models/Funcionario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from '../../services/funcionario.service';

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

  employeeForm!: FormGroup;

  cargos: Cargo[] = [];

  ngOnInit(): void {
    this.carregarCargos();
    this.employeeForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      cargo: ['', Validators.required],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required],
      senha: ['123', Validators.required],
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
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const employee = this.employeeForm.value;

    this.funcionarioService.criarFuncionario(employee).subscribe({
      next: () => {
        alert('Funcionario criado com sucesso!');
        this.employeeForm.reset();
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao criar funcionario');
      },
    });
  }
}
