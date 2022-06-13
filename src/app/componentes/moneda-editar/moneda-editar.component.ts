import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Moneda } from 'src/app/modelos/moneda';

export interface DatosMoneda {
  encabezado: string;
  moneda: Moneda;
}

@Component({
  selector: 'app-moneda-editar',
  templateUrl: './moneda-editar.component.html',
  styleUrls: ['./moneda-editar.component.css']
})
export class MonedaEditarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MonedaEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosMoneda) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }

}
