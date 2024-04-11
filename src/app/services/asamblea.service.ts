import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tbl_Asamblea } from '../models/asamblea/asamblea';

const base_url = environment.base_urlSql;

@Injectable({
  providedIn: 'root'
})
export class AsambleaService {
  private http=inject(HttpClient)

  cargarListaAsambleas(id:number,estado:string)
  {
    const url = `${base_url}/asamblea/mantenimiento/asamblea/${id}/${estado}`;
    //console.log(url)
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       tblAsamblea:[]
     })=>resp.tblAsamblea)
     );
  }

  cargarAsambleasTodas()
  {
    const url = `${base_url}/asamblea/mantenimiento/asamblea`;
    //console.log(url)
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       tblAsamblea:[]
     })=>resp.tblAsamblea)
     );
  }


  //Crear Periodos
  crearAsamblea(asamblea:tbl_Asamblea)
{
  const url = `${base_url}/asamblea/mantenimiento/asamblea`;
  return this.http.post(url,asamblea)
        .pipe(
          map((resp:{
            ok:boolean, 
            msg:string
          })=>resp)
        );
  }

  //ObtenerCondicionDelegado
  cargarCondicionDelegado(cedula:string)
  {
    const url = `${base_url}/asamblea/asistencia/delegado/${cedula}`;
    //console.log(url)
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       msg:string
       delegado:[]
     })=>resp)
     );
  }

  //ObtenerCondicionDelegado
  cargarListaAsistencia(id:number)
  {
    const url = `${base_url}/asamblea/asistencia/list/${id}`;
    //console.log(url)
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       asistencia:[]
     })=>resp)
     );
  }

   //Crear Periodos
   crearAsistenteAsamblea(asistente:any)
   {
     const url = `${base_url}/asamblea/asistencia`;
     //console.log(url)
     return this.http.post(url,asistente)
           .pipe(
             map((resp:{
               ok:boolean, 
               msg:string
             })=>resp)
           );
    }

  //Cargar Delegado por Paleta

  cargarDelegadoIDPaleta(paleta:number,idAsamb:number)
  {
    const url = `${base_url}/asamblea/asistencia/registropartic/${paleta}/${idAsamb}`;
    //console.log(url)
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       participacion:[]
     })=>resp.participacion)
     );
  }

  //Crear Participacion
  crearParticipacionDelegado(asistente:any)
  {
    const url = `${base_url}/asamblea/asistencia/participacion`;
    return this.http.post(url,asistente)
          .pipe(
            map((resp:{
              ok:boolean, 
            })=>resp)
          );
   }
   //cargarParticipacionesDelegados
   cargarPartcipaciones(estado:string,idAsamb:number)
  {
    const url = `${base_url}/asamblea/asistencia/participacion/${estado}/${idAsamb}`;
    //console.log(idAsamb)
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       participacion:[]
     })=>resp.participacion)
     );
  }

  cargarConvocatoria()
  {
    const url = `${base_url}/asamblea/asistencia/convocatoria`;
    //console.log(idAsamb)
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       convocatoria:[]
     })=>resp.convocatoria)
     );
  }

  cargarListaDelegados()
  {
    const url = `${base_url}/asamblea/mantenimiento/delegado`;
    //console.log(url)
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       delegado:[]
     })=>resp.delegado)
     );
  }
}
