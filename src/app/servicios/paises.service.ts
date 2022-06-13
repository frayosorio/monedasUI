import { HttpClient, HttpHeaders } from '@angular/common/http';
import { asNativeElements, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pais } from '../modelos/pais';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiZnJheW9zb3JpbyIsImlhdCI6MTY1NTEzMTg3NCwiZXhwIjoxNjU3NzIzODc0fQ.f8VuJWJ_Cv6hV8e-470vXmiYayEHxK4knPtZztFR5V0';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.urlBase + "paises";
  }


  public obtenerPaises(): Observable<any> {
    let urlT = this.url;
    let headers = new HttpHeaders({ 'access-token': TOKEN });
    return this.http.get<any[]>(urlT, { headers: headers });
  }

  public actualizar(pais: Pais): Observable<any> {
    let paisDto = {
      "Id": pais.id,
      "Pais": pais.pais,
      "CodigoAlfa2": pais.codigoAlfa2,
      "CodigoAlfa3": pais.codigoAlfa3,
      "IdMoneda": pais.moneda?.id,
      "Moneda": pais.moneda?.moneda,
      "Sigla": pais.moneda?.sigla,
    }

    let urlT = this.url;
    let headers = new HttpHeaders({ 'access-token': TOKEN });
    return this.http.post<any>(urlT, paisDto, { headers: headers });
  }

  public eliminar(idPais: number): Observable<any> {
    let urlT = this.url + "/" + idPais;
    let headers = new HttpHeaders({ 'access-token': TOKEN });
    return this.http.delete<any>(urlT, { headers: headers });
  }

}
