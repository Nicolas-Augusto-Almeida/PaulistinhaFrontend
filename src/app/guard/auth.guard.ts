import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getRole();
  const expectedRole = route.data['role'] as string;

  if (!userRole) {
    return router.parseUrl('/login');
  }

  if (expectedRole && expectedRole !== userRole) {
    console.warn(
      `Acesso negado. Role do usuário: ${userRole}, Role esperada: ${expectedRole}`
    );

    if (userRole === 'ROLE_GERENTE') {
      return router.parseUrl('/gerente');
    } else if (userRole === 'ROLE_ESTOQUISTA') {
      return router.parseUrl('/estoquista');
    }

    return router.parseUrl('/login');
  }

  return true;
};
