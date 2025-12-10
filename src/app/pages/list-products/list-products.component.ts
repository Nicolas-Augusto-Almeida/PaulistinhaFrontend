import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import {
  ProdutoServiceService,
  Produto,
} from '../../services/produto-service.service';

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
    private router: Router              
  ) {}

  ngOnInit(): void {
    this.produtoService.listarProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
        this.produtosFiltrados = data;
        console.log(data);
      },
      error: (err) => console.error('Erro ao carregar produtos', err),
    });
  }

  excluirProduto(id: string): void {
    if (!confirm('Tem certeza que deseja excluir este produto?')) {
      return;
    }

    this.produtoService.excluirProduto(id).subscribe({
      next: () => {
        this.produtos = this.produtos.filter((produto) => produto.id !== id);
        console.log(`Produto com ID ${id} excluído com sucesso.`);
      },
      error: (err) => {
        console.error(`Erro ao excluir o produto com ID ${id}:`, err);
        alert('Ocorreu um erro ao tentar excluir o produto.');
      },
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
      return (
        produto.nome.toLowerCase().includes(valor) ||
        produto.categoria.toLowerCase().includes(valor)
      );
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
    } 
    else if (role === 'ROLE_ESTOQUISTA') {
      this.router.navigate(['/estoquista/add-product']);
    }
    else {
      console.warn('Cargo não autorizado:', role);
    }
  }
}
