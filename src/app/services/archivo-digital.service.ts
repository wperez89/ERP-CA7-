import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { archivoDig_Lista, archivoDigital } from '../models/archivoDigital/archivoDigital.models';
import { areaDocumental, tipoConvocatoria, tipoDocumento } from '../models/archivoDigital/tablasArchivoDig.models';


const base_url = environment.base_urlSql;

@Injectable({
  providedIn: 'root'
})
export class ArchivoDigitalService {
  
  constructor(private http: HttpClient) { }

  cargarListaDoc(area:number)
  {
    const url = `${base_url}/archivo/${area}`;
    //console.log(url)
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       lista:archivoDig_Lista
     })=>resp.lista)
     );
  }

  cargarTipoDoc()
  {
    const url = `${base_url}/archivo/mantenimiento/tipodoc/A`;
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       tipoDocum:tipoDocumento
     })=>resp.tipoDocum)
     );
  }

  cargarAreaDoc()
  {
    const url = `${base_url}/archivo/mantenimiento/tipoarea/A`;
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       tipoArea:areaDocumental
     })=>resp.tipoArea)
     );
  }

  cargarTipoConvocatoria()
  {
    const url = `${base_url}/archivo/mantenimiento/tipoconv/A`;
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       tipoConvoc:tipoConvocatoria
     })=>resp.tipoConvoc)
     );
  }

  obtenerURLArchivo(CONTENEDOR: string, ARCHIVO: string)
  {
    const params = new HttpParams()
      .set('CONTENEDOR', CONTENEDOR)
      .set('ARCHIVO', ARCHIVO);
    const url = `${base_url}/archivo/view/ver-file/`;

    return this.http.get<string>(url,{ params });
  }

  //Crear Registro Documento Digital
  crearRegistroDoc(datos:archivoDigital, ARCHIVO:File)
  {
      const fechaString = new Date(datos.FECHA);

      const formData = new FormData();
      formData.append('TIPO_DOC', datos.TIPO_DOC);
      formData.append('AREA', datos.AREA);
      formData.append('NUM_SESION', datos.NUM_SESION);
      formData.append('FECHA', fechaString.toISOString());
      formData.append('CONVOCATORIA', datos.CONVOCATORIA);
      formData.append('VERSION_DOC', datos.VERSION_DOC.toString());
      formData.append('ARCHIVO', ARCHIVO);

      //console.log(formData)

      const url = `${base_url}/archivo/`;
      return this.http.post(url,formData)
      .pipe(
        map((resp:{
          ok:boolean,
          msg:string
        })=>resp)
      )            
  }

  crearAreaDoc(datos:any)
  {
      const url = `${base_url}/archivo/mantenimiento/tipoarea/`;
      return this.http.post(url,datos)
      .pipe(
        map((resp:{
          ok:boolean, 
          msg:string
        })=>resp)
      )            
  }

  crearTipoDoc(datos:any)
  {
      const url = `${base_url}/archivo/mantenimiento/tipodoc/`;
      return this.http.post(url,datos)
      .pipe(
        map((resp:{
          ok:boolean, 
          msg:string
        })=>resp)
      )            
  }
}
