import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoServiceService } from '../../services/produto-service.service';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../models/Produto.model';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  private categoriaService = inject(CategoriasService);

  productForm!: FormGroup;

  categorias: Categoria[] = [];

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
      descricao: [''],
    });

    this.categoriaService.listarCategorias().subscribe({
      next: (data) => {
        (this.categorias = data), console.log(data);
      },
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
      },
    });
  }
}
