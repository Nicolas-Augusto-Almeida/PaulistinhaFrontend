import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Produto.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private apiUrl = 'http://localhost:8080/categorias';

  private http = inject(HttpClient);

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl, { withCredentials: true });
  }
}
