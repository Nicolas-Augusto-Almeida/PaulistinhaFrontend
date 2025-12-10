import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produto {
  id: string; 
  nome: string;
  descricao?: string;
  preco: number;
  categoria: string;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoServiceService {

  private baseUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) { }

  listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl, {withCredentials:true});
  }

  excluirProduto(id: string): Observable<void> { 
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }
}