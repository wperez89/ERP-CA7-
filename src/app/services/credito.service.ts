import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment';

import { cargarLineaCreditos, cargarOperaciones, cargarTipoGarantia, cargarTipoPlanInversion } from '../interfaces/cargar-credito.interface';
import { Operacion, OperacionesVista, productoCredito } from '../models/credito/credito.models';

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

   cargarProductoCredito()
   {
    const url = `${base_url}/credito/producto`;
    return this.http.get(url)
    .pipe(
      map((resp:{
        ok:boolean,
        producto:productoCredito[]
      })=>resp.producto)
    );
   }

   crearOperacion(credito:Operacion)
   {
      const url = `${base_url}/credito`;
      return this.http.post(url,credito)
      .pipe(
        map((resp:{
          ok:boolean,
          operacion:Operacion[]
          msg:string
        })=>resp)
      );
    }

    crearsolicitud(solicitud:[])
   {
      const url = `${base_url}/solicitud/credito`;
      return this.http.post(url,solicitud)
      .pipe(
        map((resp:{
          ok:boolean,
          msg:string
        })=>resp)
      );
      
    }

    cargarSolicitudesCredito(id:number)
    {
     const url = `${base_url}/solicitud/credito/${id}`;
     //console.log(url)
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         solicitud:[]
       })=>resp.solicitud)
     );
    }

    cargarSolicitudIDCredito(id:string, estado:string, cliente:string)
    {
     const url = `${base_url}/solicitud/creditoid/${id}/${estado}/${cliente}`;
     //console.log(url)
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         solicitud:[]
       })=>resp.solicitud)
     );
    }

    cargarEstadosSolicitudCredito()
    {
     const url = `${base_url}/solicitud/estado`;
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         estado:[]
       })=>resp.estado)
     );
    }

    cargarTrnscSolicCredito(id:string)
    {
     const url = `${base_url}/solicitud/transcredit/${id}`;
     //console.log(url)
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         allTransc:[]
       })=>resp)
     );
    }

    cargarTrnscSolicCreditoID(id:number)
    {
     const url = `${base_url}/solicitud/transaccionid/${id}`;
     //console.log(url)
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         allTransc:[]
       })=>resp.allTransc)
     );
    }

    cargarTrnscEstadosSolic()
    {
     const url = `${base_url}/solicitud/transestados`;
     //console.log(url)
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         allTransc:[]
       })=>resp.allTransc)
     );
    }

    cargarAnalistaCreditos()
    {
     const url = `${base_url}/solicitud/analista`;
     //console.log(url)
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         analista:[]
       })=>resp.analista)
     );
    }

    asignarSolicitud(respuesta:string, solicitud:[])
    {
      const url = `${base_url}/solicitud/asignar`;
      return this.http.post(url,{respuesta,solicitud})
      .pipe(
        map((resp:{
          ok:boolean,
          msg:string
        })=>resp)
      );
      
    }

    crearTransaccion(solicitud:[])
    {
      
       const url = `${base_url}/solicitud/transaccion`;
       return this.http.post(url,solicitud)
       .pipe(
         map((resp:{
           ok:boolean,
           msg:string
         })=>resp)
       );
    }

    crearArchivosSolicitud(formValue: any, archivos: any[])
    {
      const url = `${base_url}/solicitud/archivos`;
      const formData = new FormData();
      
      formData.append('NUM_SOLICITUD', formValue.NUM_SOLICITUD);
      formData.append('USUARIO', formValue.USUARIO);
      formData.append('DETALLE', formValue.DETALLE);
      formData.append('ESTADO_ACT', formValue.ESTADO_ACT);
      formData.append('ESTADO_ANT', formValue.ESTADO_ANT);
      formData.append('ANALISTA', formValue.ANALISTA);
      //console.log(formValue.ANALISTA)

  archivos.forEach((archivo: any, index: number) => {
    //console.log(archivo)
    formData.append(`archivo`, archivo.documento);
    formData.append(`NOM_DOCUMENT`, archivo.tipoDoc);
    formData.append(`TIPO_ARCHIVO`, archivo.tipoArch);
    formData.append(`NOM_ARCHIVO`, archivo.NombreArch);
  });

  //console.log(formData)
  // Enviar formData al servidor
  return this.http.post(url, formData);
    }

    obtenerDocumentoSolicitud(id:string)
    {
      const url = `${base_url}/solicitud/archivos/${id}`;
     //console.log(url)
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         documento:[]
       })=>resp.documento)
     );
    }
}
