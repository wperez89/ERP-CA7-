import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Estados, Tbl_Profesiones } from '../models/global';


const base_url = environment.base_urlSql;

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  Estados: Estados;
  private claveSecreta = 'mi-clave-secreta';

  constructor(private http: HttpClient, private router: Router,) { }

  //Obtener Token de Usuario
  get token(): string
  {
      return localStorage.getItem('token') || '';
  }

  //Obtener el header
  get headers()
  {
  return {
      headers:{
      'x-token':this.token
      }
  }
  }


  cargarEstados()
   {
    const url = `${base_url}/mantenimiento/estado`;
    return this.http.get(url,this.headers)
    .pipe(
      map((resp:{
        ok:boolean,
        estados:Estados[]
      })=>resp.estados)
    );

   }

  cargarProfesiones()
  {
    const url = `${base_url}/mantenimiento/profesion`;
    return this.http.get(url,this.headers)
    .pipe(
      map((resp:{
        ok:boolean,
        occupation:Tbl_Profesiones[]
      })=>resp.occupation)
    );
  }

  cargarMetodoPago()
  {
    const url = `${base_url}/mantenimiento/facturas/metodo`;
    return this.http.get(url,this.headers)
  }

  cargarEntidadesFinancieras()
  {
    const url = `${base_url}/mantenimiento/facturas/banco`;
    return this.http.get(url,this.headers)
  }

  cargarMenu()
  {
    const url = `${base_url}/menu`;
    return this.http.get(url,this.headers)
    .pipe(
      map((resp:{
        ok:boolean,
        menu:[]
      })=>resp.menu)
    );
  }

}
