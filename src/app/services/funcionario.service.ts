import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Funcionario } from '../models/Funcionario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private apiUrl = 'http://localhost:8080/funcionarios';

  private http = inject(HttpClient);

  listarFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl, { withCredentials: true });
  }

  deletarFuncionario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  buscarPorId(id: string): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  atualizarFuncionario(
    id: string,
    funcionario: Funcionario
  ): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiUrl}/${id}`, funcionario, {
      withCredentials: true,
    });
  }

  criarFuncionario(employee: any) {
    return this.http.post(this.apiUrl, employee, { withCredentials: true });
  }
}
