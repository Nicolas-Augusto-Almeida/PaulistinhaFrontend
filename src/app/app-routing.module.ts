import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { DashboardGerenteComponent } from './pages/dashboard-gerente/dashboard-gerente.component';
import { DashboardEstoquistaComponent } from './pages/dashboard-estoquista/dashboard-estoquista.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: 'gerente',
    component: DashboardGerenteComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_GERENTE' },
  },

  {
    path: 'estoquista',
    component: DashboardEstoquistaComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ESTOQUISTA' },
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
