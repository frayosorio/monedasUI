import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Moneda } from 'src/app/modelos/moneda';
import { Pais } from 'src/app/modelos/pais';
import { MonedasService } from 'src/app/servicios/monedas.service';
import { PaisesService } from 'src/app/servicios/paises.service';
import { DecidirComponent } from '../decidir/decidir.component';
import { PaisEditarComponent } from '../pais-editar/pais-editar.component';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {

  public paises: Pais[] = [];
  public monedas: Moneda[] = [];
  public columnas = [
    { name: 'Nombre', prop: 'pais' },
    { name: 'Moneda', prop: 'moneda.moneda' },
    { name: 'Código Alfa 2', prop: 'codigoAlfa2' },
    { name: 'Código Alfa 3', prop: 'codigoAlfa3' },
  ];
  public paisSeleccion: Pais | undefined;
  public tipoSeleccion = SelectionType;
  public modoColumna = ColumnMode;
  tema: String = "dark";

  constructor(public dialog: MatDialog,
    private paisService: PaisesService,
    private monedaService: MonedasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  public onActivate(event: any) {
    if (event.type == 'click') {
      this.paisSeleccion = event.row;
    }
  }

  private pasar(datos: any[]) {
    this.paises = [];
    datos.forEach((item: any) => {
      this.paises.push(new Pais(
        item.Id,
        item.Pais,
        item.CodigoAlfa2,
        item.CodigoAlfa3,
        new Moneda(item.IdMoneda, item.Moneda, item.Sigla, "", ""),
      ));
    });
  }

  private pasarMonedas(datos: any[]) {
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
    this.paisService.obtenerPaises()
      .subscribe(data => {
        this.pasar(data);
      },
        err => {
          window.alert(err.message)
        });

    this.monedaService.obtenerMonedas()
      .subscribe(data => {
        this.pasarMonedas(data);
      },
        err => {
          window.alert(err.message)
        });
  }


  public nuevo() {
    const dialogRef = this.dialog.open(PaisEditarComponent, {
      width: '600px',
      height: '500px',
      data: {
        encabezado: "Agregando Pais:",
        pais: new Pais(
          0, //Id
          "", //Nombre
          "", //Código Alfa 2
          "", //Código Alfa 3
          new Moneda(0, "", "", "", ""),
        ),
        monedas: this.monedas,
      }
    });

    dialogRef.afterClosed().subscribe(datos => {
      this.guardar(datos.pais);
    },
      err => {
        window.alert(err.message)
      });
  }

  private guardar(pais: Pais) {
    this.paisService.actualizar(pais)
      .subscribe(dataA => {
        if (dataA) {
          this.paisService.obtenerPaises()
            .subscribe(data => {
              this.pasar(data);
            },
              err => {
                window.alert(err.message)
              });
          window.alert("Los datos del País fueron registrados");
        }
        else {
          window.alert("No se pudo actualizar el País");
        }
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            window.alert(`Error actualizando País en el cliente [${err.message}]`);
          } else {
            window.alert(`Error actualizando País en el servidor [${err.message}]`);
          }
        });
  }

  public modificar() {
    if (this.paisSeleccion != null && this.paisSeleccion.id >= 0) {
      //var publicacionEdicion = this.paisSeleccion;
      const dialogRef = this.dialog.open(PaisEditarComponent, {
        width: '600px',
        height: '500px',
        data: {
          encabezado: `Editando a datos de ${this.paisSeleccion.pais}`,
          pais: this.paisSeleccion,
          monedas: this.monedas,
        }
      });

      dialogRef.afterClosed().subscribe(datos => {
        this.guardar(datos.pais);
      },
        err => {
          window.alert(err.message)
        });
    }
  }

  public verificarEliminar() {
    if (this.paisSeleccion != null && this.paisSeleccion.id >= 0) {
      const dialogRef = this.dialog.open(DecidirComponent, {
        width: '400px',
        height: '200px',
        data: {
          titulo: `Eliminando registro de ${this.paisSeleccion.pais}`,
          mensaje: "Está seguro?",
          id: this.paisSeleccion.id
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

  private eliminar(idPais: number) {
    this.paisService.eliminar(idPais)
      .subscribe((dataE) => {
        this.paisService.obtenerPaises()
          .subscribe(data => {
            this.pasar(data);
          },
            err => {
              window.alert(err.message)
            });
        window.alert("El registro del País fue eliminado");
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            window.alert(`Error eliminando Pais en el cliente [${err.message}]`);
          } else {
            window.alert(`Error eliminando País en el servidor [${err.message}]`);
          }
        }
      );
  }


}

