import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoServiceService } from '../../services/produto-service.service';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;

  categorias = [
    'HORTIFRUTI',
    'ACOUGUE',
    'PADARIA',
    'FRIOS_E_LATICINIOS',
    'MERCEARIA',
    'BEBIDAS',
    'CONGELADOS',
    'HIGIENE_PESSOAL',
    'LIMPEZA',
    'PET_SHOP',
    'BEBE',
    'CUIDADOS_COM_A_CASA',
    'PRODUTOS_DE_SAUDE',
    'DOCES_E_SNACKS'
  ];

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoServiceService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      nome: ['', Validators.required],
      preco: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      quantidade: ['', [Validators.required, Validators.min(0)]],
      descricao: ['']
    });
  }

  salvar() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const produto = this.productForm.value;

    this.produtoService.criarProduto(produto).subscribe({
      next: () => {
        alert('Produto criado com sucesso!');
        this.productForm.reset();
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao criar produto');
      }
    });
  }
}
