import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { DashboardGerenteComponent } from './pages/dashboard-gerente/dashboard-gerente.component';
import { DashboardEstoquistaComponent } from './pages/dashboard-estoquista/dashboard-estoquista.component';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ListEmployeesComponent } from './pages/list-employees/list-employees.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';

export const routes: Routes = [
  {
    path: 'gerente',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_GERENTE' },
    children: [
      { path: 'home', component: DashboardGerenteComponent },
      { path: 'funcionarios', component: ListEmployeesComponent },
      { path: 'produtos', component: ListProductsComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'add-funcionario', component: AddEmployeeComponent },
      { path: 'edit-funcionario/:cpf', component: AddEmployeeComponent },
    ],
  },

  {
    path: 'estoquista',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ESTOQUISTA' },
    children: [
      { path: 'home', component: DashboardEstoquistaComponent },
      { path: 'produtos', component: ListProductsComponent },
      { path: 'add-product', component: AddProductComponent },
    ],
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
