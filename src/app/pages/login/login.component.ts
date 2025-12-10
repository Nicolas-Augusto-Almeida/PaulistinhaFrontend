import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importar Router
import { AuthService } from '../../services/auth.service'; // Ajuste o caminho se necessário

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    cpf: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
  });

  private authService = inject(AuthService);
  private router = inject(Router);

  logar() {
    if (this.loginForm.invalid) return;

    const loginData = {
      cpf: this.loginForm.get('cpf')?.value || '',
      senha: this.loginForm.get('senha')?.value || '',
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        if (response.role === 'ROLE_GERENTE') {
          this.router.navigate(['/gerente/home']);
        } else if (response.role === 'ROLE_ESTOQUISTA') {
          this.router.navigate(['/estoquista/home']);
        } else {
          alert('Perfil não autorizado ou desconhecido');
        }
      },
      error: (err) => {
        console.error('Erro:', err);
        alert('Usuário ou senha inválidos!');
      },
    });
  }
}
