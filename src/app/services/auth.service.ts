import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { authLoginRequest, authLoginResponse } from '../types/authLogin.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private ROLE_KEY = 'userRole';
  constructor(private http: HttpClient) {}

  login(credenciais: authLoginRequest): Observable<authLoginResponse> {
    return this.http
      .post<authLoginResponse>(`${this.apiUrl}/login`, credenciais, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.setRole(response.role);
        })
      );
  }

  setRole(role: string) {
    localStorage.setItem(this.ROLE_KEY, role);
  }

  getRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  logout() {
    localStorage.removeItem(this.ROLE_KEY);
  }
}
