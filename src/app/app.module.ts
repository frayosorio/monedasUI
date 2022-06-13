import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { MenuPrincipalComponent } from './componentes/menu-principal/menu-principal.component';
import { ReferenciasMaterialModule } from './referencias-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonedasComponent } from './componentes/monedas/monedas.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { MonedaEditarComponent } from './componentes/moneda-editar/moneda-editar.component';
import { FormsModule } from '@angular/forms';
import { DecidirComponent } from './componentes/decidir/decidir.component';
import { PaisesComponent } from './componentes/paises/paises.component';
import { PaisEditarComponent } from './componentes/pais-editar/pais-editar.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuPrincipalComponent,
    MonedasComponent,
    MonedaEditarComponent,
    DecidirComponent,
    PaisesComponent,
    PaisEditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReferenciasMaterialModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
