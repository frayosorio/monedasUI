import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Moneda } from 'src/app/modelos/moneda';
import { MonedasService } from 'src/app/servicios/monedas.service';
import { DecidirComponent } from '../decidir/decidir.component';
import { MonedaEditarComponent } from '../moneda-editar/moneda-editar.component';

@Component({
  selector: 'app-monedas',
  templateUrl: './monedas.component.html',
  styleUrls: ['./monedas.component.css']
})
export class MonedasComponent implements OnInit {

  public monedas: Moneda[] = [];
  public columnas = [
    { name: 'Nombre', prop: 'moneda' },
    { name: 'Sigla', prop: 'sigla' },
    { name: 'Símbolo', prop: 'simbolo' },
    { name: 'Emisor', prop: 'emisor' },
  ];

  public monedaSeleccion: Moneda | undefined;
  public tipoSeleccion = SelectionType;
  public modoColumna = ColumnMode;
  public tema: String = "dark";

  constructor(public dialog: MatDialog,
    private monedaService: MonedasService,
    private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  public onActivate(event: any) {
    if (event.type == 'click') {
      this.monedaSeleccion = event.row;
    }
  }



  private pasar(datos: any[]) {
    this.monedas = [];
    datos.forEach((item: any) => {
      this.monedas.push(new Moneda(
        item.Id,
        item.Moneda,
        item.Sigla,
        item.Simbolo,
        item.Emisor
      ));
    });
  }

  public listar() {
    this.monedaService.obtenerMonedas()
      .subscribe(data => {
        this.pasar(data);
      },
        err => {
          window.alert(err.message)
        });
  }

  public nuevo() {
    const dialogRef = this.dialog.open(MonedaEditarComponent, {
      width: '600px',
      height: '500px',
      data: {
        encabezado: "Agregando Moneda:",
        moneda: new Moneda(
          0, //Id
          "", //Nombre
          "", //Sigla
          "", //Simbolo
          "", //Emisor
        ),
      }
    });

    dialogRef.afterClosed().subscribe(datos => {
      this.guardar(datos.moneda);
    },
      err => {
        window.alert(err.message)
      });
  }

  private guardar(moneda: Moneda) {
    this.monedaService.actualizar(moneda)
      .subscribe(dataA => {
        if (dataA) {
          this.monedaService.obtenerMonedas()
            .subscribe(data => {
              this.pasar(data);
            },
              err => {
                window.alert(err.message)
              });
          window.alert("Los datos de la Moneda fueron registrados");
        }
        else {
          window.alert("No se pudo actualizar la Moneda");
        }
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            window.alert(`Error actualizando Moneda en el cliente [${err.message}]`);
          } else {
            window.alert(`Error actualizando Moneda en el servidor [${err.message}]`);
          }
        });
  }

  public modificar() {
    if (this.monedaSeleccion  != null && this.monedaSeleccion.id >= 0) {
      const dialogRef = this.dialog.open(MonedaEditarComponent, {
        width: '600px',
        height: '500px',
        data: {
          encabezado: `Editando datos de ${this.monedaSeleccion.moneda}`,
          moneda: this.monedaSeleccion,
        }
      });

      dialogRef.afterClosed().subscribe(datos => {
        this.guardar(datos.moneda);
      },
        err => {
          window.alert(err.message)
        });
    }
  }

  public verificarEliminar() {
    if (this.monedaSeleccion != null && this.monedaSeleccion.id >= 0) {
      const dialogRef = this.dialog.open(DecidirComponent, {
        width: '400px',
        height: '200px',
        data: {
          titulo: `Eliminando registro de ${this.monedaSeleccion.moneda}`,
          mensaje: "Está seguro?",
          id: this.monedaSeleccion.id
        }
      });

      dialogRef.afterClosed().subscribe(datos => {
        this.eliminar(datos.id);
      },
        err => {
          window.alert(err.message)
        });
    }
  }

  private eliminar(idMoneda: number) {
    this.monedaService.eliminar(idMoneda)
    .subscribe((dataE) => {
      this.monedaService.obtenerMonedas()
        .subscribe(data => {
          this.pasar(data);
        },
          err => {
            window.alert(err.message)
          });
      window.alert("El registro de la Moneda fue eliminado");
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          window.alert(`Error eliminando Moneda en el cliente [${err.message}]`);
        } else {
          window.alert(`Error eliminando Moneda en el servidor [${err.message}]`);
        }
      }
    );
  }



}
