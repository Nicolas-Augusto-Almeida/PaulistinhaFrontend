import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  linkHome: string = '/login';

  ngOnInit(): void {
    const role = this.authService.getRole();

    if (role === 'ROLE_GERENTE') {
      this.linkHome = '/gerente/home';
    } else if (role === 'ROLE_ESTOQUISTA') {
      this.linkHome = '/estoquista/home';
    } else {
      this.linkHome = '/login';
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
