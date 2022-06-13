import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Moneda } from '../modelos/moneda';

@Injectable({
  providedIn: 'root'
})
export class MonedasService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.urlBase + "monedas";
  }

  public obtenerMonedas(): Observable<any> {
    let urlT = this.url;
    return this.http.get<any[]>(urlT);
  }

  public actualizar(moneda: Moneda): Observable<any> {
    let urlT = this.url;
    let monedaDto = {
      "Id": moneda.id,
      "Moneda": moneda.moneda,
      "Sigla": moneda.sigla,
      "Simbolo": moneda.simbolo,
      "Emisor": moneda.emisor
    }
    return this.http.post<any>(urlT, monedaDto);
  }

  public eliminar(idMoneda: number): Observable<any> {
    let urlT = this.url + "/" + idMoneda;
    return this.http.delete<any>(urlT);
  }

}
