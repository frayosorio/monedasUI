import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { MonedasComponent } from './componentes/monedas/monedas.component';

const routes: Routes = [

{ path: "inicio", component: InicioComponent},
{ path: 'monedas', component: MonedasComponent },

{ path: "**", redirectTo: "inicio" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
