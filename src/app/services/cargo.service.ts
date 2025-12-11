import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo } from '../models/Funcionario.model';

@Injectable({
  providedIn: 'root',
})
export class CargoService {
  private apiUrl = 'http://localhost:8080/cargos';

  private http = inject(HttpClient);

  listarCategorias(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.apiUrl, { withCredentials: true });
  }
}
