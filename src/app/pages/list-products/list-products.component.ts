import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProdutoServiceService } from '../../services/produto-service.service';
import { Produto } from '../../models/Produto.model';

@Component({
  selector: 'app-list-products',
  standalone: false,
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];

  constructor(
    private produtoService: ProdutoServiceService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  excluirProduto(id: string): void {
    if (!confirm('Tem certeza que deseja excluir este produto?')) {
      return;
    }

    this.produtoService.excluirProduto(id).subscribe({
      next: () => {
        this.produtos = this.produtos.filter((produto) => produto.id !== id);
        this.carregarProdutos();
        console.log(`Produto com ID ${id} excluído com sucesso.`);
      },
      error: (err) => {
        console.error(`Erro ao excluir o produto com ID ${id}:`, err);
        alert('Ocorreu um erro ao tentar excluir o produto.');
      },
    });
  }

  carregarProdutos() {
    this.produtoService.listarProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
        this.produtosFiltrados = data;
        console.log(data);
      },
      error: (err) => console.error('Erro ao carregar produtos', err),
    });
  }

  filtrar(event: Event) {
    const input = event.target as HTMLInputElement;
    const valor = input.value.toLowerCase();

    if (!valor) {
      this.produtosFiltrados = this.produtos;
      return;
    }

    this.produtosFiltrados = this.produtos.filter((produto) => {
      const nome = (produto.nome || '').toLowerCase();
      const nomeCategoria = (
        produto.categoria?.nomeCategoria || ''
      ).toLowerCase();

      return nome.includes(valor) || nomeCategoria.includes(valor);
    });
  }

  irParaCadastro() {
    const role = this.authService.getRole();

    if (!role) {
      console.error('Nenhum role encontrado. Usuário não está logado.');
      return;
    }

    if (role === 'ROLE_GERENTE') {
      this.router.navigate(['/gerente/add-product']);
    } else if (role === 'ROLE_ESTOQUISTA') {
      this.router.navigate(['/estoquista/add-product']);
    } else {
      console.warn('Cargo não autorizado:', role);
    }
  }
  
editarProduto(id: string) {
  this.router.navigate(['../edit-product', id], { relativeTo: this.route });
}
}
