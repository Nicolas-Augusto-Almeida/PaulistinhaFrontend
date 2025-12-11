import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoServiceService } from '../../services/produto-service.service';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../models/Produto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  isEditMode = false;
  produtoId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
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
      next: (data) => (this.categorias = data),
      error: (err) => console.error('Erro ao carregar categorias', err),
    });

    this.produtoId = this.route.snapshot.paramMap.get('id');

    if (this.produtoId) {
      this.isEditMode = true;
      this.carregarDadosProduto(this.produtoId);
    }
  }

  carregarDadosProduto(id: string) {
    this.produtoService.buscarProdutoPorId(id).subscribe({
      next: (produto) => {
        this.productForm.patchValue(produto);
      },
      error: (err) => console.error('Erro ao carregar produto', err),
    });
  }

  salvar() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const produto = this.productForm.value;

    if (this.isEditMode && this.produtoId) {
      this.produtoService.atualizarProduto(this.produtoId, produto).subscribe({
        next: () => {
          alert('Produto atualizado com sucesso!');
          this.router.navigate(this.obterRotaDestino());
        },
        error: () => alert('Erro ao atualizar produto'),
      });
      return;
    }

    this.produtoService.criarProduto(produto).subscribe({
      next: () => {
        alert('Produto criado com sucesso!');
        this.productForm.reset();
        this.router.navigate(this.obterRotaDestino());
      },
      error: () => alert('Erro ao criar produto'),
    });
  }

  private obterRotaDestino(): string[] {
    const perfil = this.auth.getRole();

    if (perfil === 'ROLE_GERENTE') {
      return ['/gerente/produtos'];
    } else {
      return ['/estoquista/produtos'];
    }
  }
}
