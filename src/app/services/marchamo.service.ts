import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { datosCupon } from '../models/marchamos/rifas';

const base_url = environment.base_urlSql;

@Injectable({
  providedIn: 'root'
})
export class MarchamoService {

  constructor(private http: HttpClient) { }

  cargarCupones()
  {
    const url = `${base_url}/marchamo/rifa/cuponesPend`;
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       cupones:[]
     })=>resp)
     );
  }

  cargarDatosCupones(cupon:string)
  {
    const url = `${base_url}/marchamo/rifa/cupones/${cupon}`;
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       datos:[]
     })=>resp)
     );
  }

    //Actualizar Usuario por ID
    updatePersonaID(id:string,cupon:datosCupon)
    {
      const url = `${base_url}/marchamo/rifa/datoscupones/${id}`;
        return this.http.post(url,cupon)
        .pipe(
          map((resp:{
            ok:boolean, 
            cupon:datosCupon[],
            msg:string
          })=>resp)
        )    
    }
}
