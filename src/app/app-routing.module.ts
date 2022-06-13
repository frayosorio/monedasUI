import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { MonedasComponent } from './componentes/monedas/monedas.component';
import { PaisesComponent } from './componentes/paises/paises.component';

const routes: Routes = [

{ path: "inicio", component: InicioComponent},
{ path: 'monedas', component: MonedasComponent },
{ path: 'paises', component: PaisesComponent },

{ path: "**", redirectTo: "inicio" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
