import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from '@angular/common'; // Necessário para o pipe 'currency'
import localePt from '@angular/common/locales/pt'; // Locale para pt-BR

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardGerenteComponent } from './pages/dashboard-gerente/dashboard-gerente.component';
import { DashboardEstoquistaComponent } from './pages/dashboard-estoquista/dashboard-estoquista.component';
import { HttpClientModule } from '@angular/common/http';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardComponent } from './components/card/card.component';
import { ListProductsComponent } from './pages/list-products/list-products.component'; 

registerLocaleData(localePt); 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardGerenteComponent,
    DashboardEstoquistaComponent,
    MainLayoutComponent,
    FooterComponent,
    CardComponent,
    ListProductsComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [
    provideNgxMask(),

    { provide: LOCALE_ID, useValue: 'pt-BR' } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}