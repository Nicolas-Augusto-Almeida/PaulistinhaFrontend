import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/Produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoServiceService {
  private baseUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) {}

  listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl, { withCredentials: true });
  }

  excluirProduto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }

  criarProduto(produto: any) {
    return this.http.post(this.baseUrl, produto, { withCredentials: true });
  }

  buscarProdutoPorId(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }

  atualizarProduto(id: string, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.baseUrl}/${id}`, produto, {
      withCredentials: true,
    });
  }

  adicionarEstoque(nome: string, quantidade: number): Observable<Produto> {
    const params = new HttpParams().set('quantidade', quantidade.toString());

    return this.http.put<Produto>(
      `${this.baseUrl}/adicionar/${nome}`,
      {},
      { params }
    );
  }

  retirarEstoque(nome: string, quantidade: number): Observable<Produto> {
    const params = new HttpParams().set('quantidade', quantidade.toString());

    return this.http.put<Produto>(
      `${this.baseUrl}/retirar/${nome}`,
      {},
      { params }
    );
  }
}
