import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  public opciones=[
    { titulo: 'Monedas', url: 'monedas', icono: 'assets/iconos/Monedas.png' },
    { titulo: 'Paises', url: 'paises', icono: 'assets/iconos/Paises.png' },
    { titulo: 'Cambios', url: 'cambios', icono: 'assets/iconos/Cambios.png' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
