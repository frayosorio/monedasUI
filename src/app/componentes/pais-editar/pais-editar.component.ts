import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Moneda } from 'src/app/modelos/moneda';
import { Pais } from 'src/app/modelos/pais';

export interface DatosPais {
  encabezado: string;
  pais: Pais;
  monedas: Moneda[];
}

@Component({
  selector: 'app-pais-editar',
  templateUrl: './pais-editar.component.html',
  styleUrls: ['./pais-editar.component.css']
})
export class PaisEditarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PaisEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosPais) {
  }

  ngOnInit(): void {

  }

  cancelar() {
    this.dialogRef.close();
  }

}
