import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { cargarCanton, cargarDistrito, cargarListaAvaluos, cargarProvincia } from '../interfaces/cargar-avaluo.interface';
import { AvaluoLista, infoAvaluos } from '../models/avaluos/avaluo.models';
import { cotizacion, cotizacionnNew, ctznLista } from '../models/avaluos/ctzn.models';
import { facturaProf, listaFactura } from '../models/avaluos/factura.models';


const base_url = environment.base_urlSql;

@Injectable({
  providedIn: 'root'
})
export class AvaluoService {

  constructor(private http: HttpClient) { }
  
  cargarListaAvaluos(estado: string)
  {

  const params = new HttpParams().set('estado', estado);
   const url = `${base_url}/avaluo`;
   return this.http.get<cargarListaAvaluos>(url,{params})
   .pipe(
    map(resp=>{
      const avaluos = resp.avaluos.map(
        x => new AvaluoLista(x.IDENTIFICACION,x.ID,x.NOMBRE,x.DATE_CREATED,x.ID_AVALUO,x.CREATED,x.ESTADO)
      );
      return {
        avaluos
      };
    })
  );
  }

  cargarProvincia()
  {
   const url = `${base_url}/region/provincia`;
   return this.http.get(url)
   .pipe(
     map((resp:{
       ok:boolean,
       provincia:cargarProvincia[]
     })=>resp.provincia)
   );
  }

  cargarCanton(provincia: number)
  {
    const params = new HttpParams().set('provincia', provincia);
    const url = `${base_url}/region/canton`;
    return this.http.get(url,{params})
    .pipe(
     map((resp:{
       ok:boolean,
       canton:cargarCanton[]
     })=>resp.canton)
     );
  }

  cargarDistrito(canton: number)
  {
    const params = new HttpParams().set('canton', canton);
    const url = `${base_url}/region/distrito`;
    return this.http.get(url,{params})
    .pipe(
     map((resp:{
       ok:boolean,
       distrito:cargarDistrito[]
     })=>resp.distrito)
     );
  }

  crearRegistroAvaluo(datos:AvaluoLista)
  {
      const url = `${base_url}/avaluo`;
      return this.http.post(url,datos)
      .pipe(
        map((resp:{
          ok:boolean, 
          avaluo:AvaluoLista[]
        })=>resp)
      )            
  }

  cargarInfoAvaluos(id: string)
  {
    const url = `${base_url}/avaluodatos/${id}`;
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       avaluos:infoAvaluos[]
     })=>resp.avaluos[0])
     );
  }

  //Actualizar Usuario por ID
  updateAvaluoID(avaluo:infoAvaluos)
  {
    const url = `${base_url}/avaluo`;
      return this.http.put(url,avaluo)
      .pipe(
        map((resp:{
          ok:boolean, 
          avaluo:infoAvaluos[],
          msg:string
        })=>resp)
      )    
  }

  cargarCtznAvaluos(tipo: number, avaluo:string)
  {
    const params = new HttpParams().set('tipo', tipo).set('avaluo',avaluo);
    const url = `${base_url}/avaluo/cotizacion`;
    return this.http.get(url,{params})
    .pipe(
     map((resp:{
       ok:boolean,
       ctzn:ctznLista[]
     })=>resp)
     );
  }

  cargarCtznID( ctzn:string)
  {
    const params = new HttpParams().set('ctzn',ctzn);
    const url = `${base_url}/avaluo/cotizacionID`;
    return this.http.get(url,{params})
    .pipe(
     map((resp:{
       ok:boolean,
       ctznID:cotizacion[]
     })=>resp.ctznID[0])
     );
  }

  anularAvaluo( id:string)
  {
    const url = `${base_url}/avaluoinactive`;
    return this.http.put(url,{ id })
    .pipe(
     map((resp:{
       ok:boolean,
       msg:string
     })=>resp)
     );
  }

  crearCtzcnAvaluo(datos:cotizacionnNew)
  {
      const url = `${base_url}/avaluo/cotizacion`;
      return this.http.post(url,datos)
      .pipe(
        map((resp:{
          ok:boolean, 
          ctzn:cotizacion,
          msg:string
        })=>resp)
      )            
  }

  updateCtzcnAvaluo(datos:cotizacion)
  {
      const url = `${base_url}/avaluo/cotizacion`;
      return this.http.put(url,datos)
      .pipe(
        map((resp:{
          ok:boolean, 
          cotizacion:cotizacion,
          msg:string
        })=>resp)
      )            
  }

  //Subir COtizacion
  uploadCotizacion(ctzcn: string, DOC_CTZCN: File)
  {
    const formData = new FormData();
    formData.append('ctzcn', ctzcn);
    formData.append('DOC_CTZCN', DOC_CTZCN);

    const url = `${base_url}/avaluoctznfile`;
    return this.http.put(url,formData)
    .pipe(     
      map((resp:{
        ok:boolean,
        msg:string
      })=>resp)
  );
  }

  downloadFile(blob:string, container:string)
  {
    const url = `${base_url}/avaluofile/${container}/${blob}`;
    return this.http.get(url,{ responseType: 'blob' })
  }

  crearFactAvaluo(datos:facturaProf)
  {
      const url = `${base_url}/facturaAvl`;
      return this.http.post(url,datos)
      .pipe(
        map((resp:{
          ok:boolean, 
          Factura:facturaProf,
          msg:string
        })=>resp)
      )            
  }

  updateFactAvaluo(datos:facturaProf)
  {
      const url = `${base_url}/facturaAvl`;
      return this.http.put(url,datos)
      .pipe(
        map((resp:{
          ok:boolean, 
          Factura:facturaProf,
          msg:string
        })=>resp)
      )            
  }

  cargarFacturaLista( id:string)
  {
    const params = new HttpParams().set('REFERENCIA_FACT',id);
    const url = `${base_url}/facturaAvl`;
    return this.http.get(url,{params})
    .pipe(
     map((resp:{
       ok:boolean,
       factura:listaFactura[]
     })=>resp.factura)
     );
  }

  cargarFacturaID( id:string,fact:string)
  {
    const params = new HttpParams().set('REFERENCIA_FACT',id).set('ID_FACTURA',fact);
    const url = `${base_url}/facturaAvlId`;
    return this.http.get(url,{params})
    .pipe(
     map((resp:{
       ok:boolean,
       factura:listaFactura[]
     })=>resp.factura[0])
     );
  }

  //Subir Archivo Cotizacion
  uploadFactura(ref: string, DOC: File,tipo:string)
  {
    const formData = new FormData();
    formData.append('ref', ref);
    formData.append('DOC', DOC);
    formData.append('tipo', tipo);

    const url = `${base_url}/facturafile`;
    return this.http.put(url,formData)
    .pipe(     
      map((resp:{
        ok:boolean,
        msg:string
      })=>resp)
  );
  }

  //Informe de Profesionales
  cargarInformeProfesionales(tipo:string, fechaIni:string,FechaFin:string,asignado:number)
  {
    const params = new HttpParams().set('tipo',tipo).set('FECHA_INICIO',fechaIni).set('FECHA_FINAL',FechaFin)
    .set('ASIGNADO',asignado);
    const url = `${base_url}/avaluoInforme/CtznProf`;
    return this.http.get(url,{params})
    .pipe(
     map((resp:{
       ok:boolean,
       resultados:any
     })=>resp.resultados)
     );
  }

  //Subir Archivo Avaluo

  uploadArchivoAvaluo(avlo: string, DOCUMENTO: File)
  {
    const formData = new FormData();
    formData.append('avlo', avlo);
    formData.append('DOC_AVLO', DOCUMENTO);

    const url = `${base_url}/avaluofile`;
    return this.http.put(url,formData)
    .pipe(     
      map((resp:{
        ok:boolean,
        msg:string
      })=>resp)
  );
  }
}

