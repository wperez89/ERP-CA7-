import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment';

import { cargarLineaCreditos, cargarOperaciones, cargarTipoGarantia, cargarTipoPlanInversion } from '../interfaces/cargar-credito.interface';
import { Operacion, OperacionesVista } from '../models/credito/credito.models';

const base_url = environment.base_urlSql;

@Injectable({
  providedIn: 'root'
})
export class CreditoService {

  constructor(private http: HttpClient, private router: Router, private ngzone: NgZone) { }

  //Cargar Usuarios de Base de Datos
  cargarOperaciones()
  {
    const url = `${base_url}/credito`;
    return this.http.get<cargarOperaciones>(url)
    .pipe(
      map(resp=>{
        const operaciones = resp.operaciones.map(
          x => new OperacionesVista(x.IDOPERACION,x.CEDULA,x.NOMBRE,x.LINEA_CREDITO,x.FECHA_FORMALIZACION,)
        );
        return {
         operaciones
        };
      })
    )
  }

  cargarGarantias()
   {
    const url = `${base_url}/credito/garantia`;
    return this.http.get(url)
    .pipe(
      map((resp:{
        ok:boolean,
        Garantia:cargarTipoGarantia[]
      })=>resp.Garantia)
    );
   }

   cargarLineasCredito()
   {
    const url = `${base_url}/credito/lineas`;
    return this.http.get(url)
    .pipe(
      map((resp:{
        ok:boolean,
        LineaCred:cargarLineaCreditos[]
      })=>resp.LineaCred)
    );
   }

   cargarTipoInversion()
   {
    const url = `${base_url}/credito/inversion`;
    return this.http.get(url)
    .pipe(
      map((resp:{
        ok:boolean,
        planInv:cargarTipoPlanInversion[]
      })=>resp.planInv)
    );
   }

   crearOperacion(credito:Operacion)
   {
      const url = `${base_url}/credito/`;
      return this.http.post(url,credito)
      .pipe(
        map((resp:{
          ok:boolean,
          operacion:Operacion[]
          msg:string
        })=>resp)
      );
      
    } 
}
