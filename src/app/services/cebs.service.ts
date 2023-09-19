import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { aprobacion, beneficios, periodo } from '../models/cebs/tablas.models';
import { listaSubsidioMed, subsidioMed } from '../models/cebs/subsidio.models';
import { aprobacion_Solicitud } from '../models/cebs/aprobacion.models';
import { liquidacion_Solicitud } from '../models/cebs/liquidacion.models';

const base_url = environment.base_urlSql;
@Injectable({
  providedIn: 'root'
})
export class CebsService {

  constructor(private http: HttpClient) { }

  
  cargarPeriodos()
  {
    const url = `${base_url}/cebs/mantenimiento/periodo`;
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       periodo:periodo
     })=>resp.periodo)
     );
  }

  cargarAprobadores()
  {
    const url = `${base_url}/cebs/mantenimiento/aprobador`;
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       opcion:aprobacion
     })=>resp.opcion)
     );
  }

  cargarBeneficios()
  {
    const url = `${base_url}/cebs/mantenimiento/beneficios`;
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       beneficios:beneficios
     })=>resp.beneficios)
     );
  }

  cargarPeriodosActivos()
  {
    const url = `${base_url}/cebs/mantenimiento/periodo/Activo`;
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       periodo:periodo
     })=>resp.periodo)
     );
  }

  cargarAprobadoresActivos()
  {
    const url = `${base_url}/cebs/mantenimiento/aprobador/Activo`;
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       opciones:aprobacion
     })=>resp.opciones)
     );
  }

  cargarBeneficiosActivos()
  {
    const url = `${base_url}/cebs/mantenimiento/beneficios/Activo`;
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       beneficios:beneficios
     })=>resp.beneficios)
     );
  }

//Crear Periodos
  crearPeriodo(periodo:periodo)
{
  const url = `${base_url}/cebs/mantenimiento/periodo`;
  return this.http.post(url,periodo)
        .pipe(
          map((resp:{
            ok:boolean, 
            msg:string
          })=>resp)
        );
  }

//Crear Beneficios
  crearBeneficios(beneficio:beneficios)
  {
    const url = `${base_url}/cebs/mantenimiento/beneficios`;
    return this.http.post(url,beneficio)
          .pipe(
            map((resp:{
              ok:boolean, 
              msg:string
            })=>resp
            )
            );
  }

//Crear Aprobadores
  crearAprobadores(aprobador:aprobacion)
  {
    const url = `${base_url}/cebs/mantenimiento/aprobador`;
    return this.http.post(url,aprobador)
          .pipe(
            map((resp:{
              ok:boolean, 
              msg:string
            })=>resp
            )
            );
  }
  //Actualizar Periodos
  actualizarPeriodo(periodo:periodo)
{
  const url = `${base_url}/cebs/mantenimiento/periodo`;
  return this.http.put(url,periodo)
        .pipe(
          map((resp:{
            ok:boolean, 
            msg:string
          })=>resp)
        );
  }

//Actualizar Beneficios
  actualizarBeneficios(beneficio:beneficios)
  {
    const url = `${base_url}/cebs/mantenimiento/beneficios`;
    return this.http.put(url,beneficio)
          .pipe(
            map((resp:{
              ok:boolean, 
              msg:string
            })=>resp
            )
            );
  }

//Actualizar Beneficios
  actualizarAprobadores(aprobador:aprobacion)
  {
  const url = `${base_url}/cebs/mantenimiento/aprobador`;
  return this.http.put(url,aprobador)
      .pipe(
        map((resp:{
          ok:boolean, 
          msg:string
        })=>resp
        )
        );
  }

  //Crear Subsidio Medico
  crearSubsidio(subsidio:subsidioMed, ARCHIVO:File)
  {
    const fechaString = new Date(subsidio.FECHA);

    const formData = new FormData();
      formData.append('APROBADO', subsidio.APROBADO.toString());
      formData.append('ESTADO', subsidio.ESTADO);
      formData.append('ID_PERSONA', subsidio.ID_PERSONA);
      formData.append('ID_SUBSIDIO', subsidio.ID_SUBSIDIO);
      formData.append('FECHA', fechaString.toISOString());
      formData.append('MONTO_FACT',subsidio.MONTO_FACT.toString());
      formData.append('MONTO_SUBSIDIO', subsidio.MONTO_SUBSIDIO.toString());
      formData.append('NOMBRE', subsidio.NOMBRE);
      formData.append('OBSERVACION', subsidio.OBSERVACION);
      formData.append('PAGADO', subsidio.PAGADO.toString());
      formData.append('EDITADO', subsidio.EDITADO.toString());
      formData.append('PERIODO', subsidio.PERIODO.toString());
      formData.append('TIPO_BENEFICIO', subsidio.TIPO_BENEFICIO.toString());
      formData.append('USUARIO_RECIBE', subsidio.USUARIO_RECIBE);

      formData.append('ARCHIVO', ARCHIVO);

    const url = `${base_url}/cebs/subsidio`;
    return this.http.post(url,formData)
          .pipe(
            map((resp:{
              ok:boolean, 
              msg:string
            })=>resp
            )
            );
  }

  //Crear Subsidio Medico
  updateSubsidio(subsidio:subsidioMed, ARCHIVO:File)
  {
    const fechaString = new Date(subsidio.FECHA);

    const formData = new FormData();
      formData.append('APROBADO', subsidio.APROBADO.toString());
      formData.append('ESTADO', subsidio.ESTADO);
      formData.append('ID_PERSONA', subsidio.ID_PERSONA);
      formData.append('FECHA', fechaString.toISOString());
      formData.append('MONTO_FACT',subsidio.MONTO_FACT.toString());
      formData.append('MONTO_SUBSIDIO', subsidio.MONTO_SUBSIDIO.toString());
      formData.append('NOMBRE', subsidio.NOMBRE);
      formData.append('OBSERVACION', subsidio.OBSERVACION);
      formData.append('PAGADO', subsidio.PAGADO.toString());
      formData.append('PERIODO', subsidio.PERIODO.toString());
      formData.append('TIPO_BENEFICIO', subsidio.TIPO_BENEFICIO.toString());
      formData.append('USUARIO_RECIBE', subsidio.USUARIO_RECIBE);
      formData.append('ARCHIVO', ARCHIVO);

    const url = `${base_url}/cebs/subsidio/${subsidio.ID_SUBSIDIO}`;
    return this.http.put(url,formData)
          .pipe(
            map((resp:{
              ok:boolean, 
              msg:string
            })=>resp
            )
            );
  }

  cargarListaSubsidios(aprobado:boolean, pagado:boolean, estado:string)
  {
    const url = `${base_url}/cebs/subsidio/${aprobado}/${pagado}/${estado}`;
    return this.http.get(url)
    .pipe(
     map((resp:{
       ok:boolean,
       subsidio:listaSubsidioMed,
       presupuesto: Float32Array
     })=>resp)
     );
  }

  cargarexisteSubsidio(id:string)
  {
    const url = `${base_url}/cebs/subsidio/existe/${id}`;
    return this.http.get(url);
  }

  cargarSubsidioID(id:string,persona:string,periodo:number,estado:string)
  {
    const url = `${base_url}/cebs/subsidio/${id}/${persona}/${periodo}/${estado}`;
    return this.http.get(url)
    .pipe(
      map((resp:{
        ok:boolean, 
        ayuda:subsidioMed
      })=>resp
      )
      );
  }

  cargarAprobacionSubId(id:string,periodo:number)
  {
    const url = `${base_url}/cebs/aprobacion/${id}/${periodo}`;
    return this.http.get(url)
    .pipe(
      map((resp:{
        ok:boolean, 
        registro:any
      })=>resp
      )
      );
  }

  //Crear Subsidio Medico
  crearAprobacion(aprobacion:aprobacion_Solicitud)
  {
    const url = `${base_url}/cebs/aprobacion`;
    return this.http.post(url,aprobacion)
          .pipe(
            map((resp:{
              ok:boolean, 
              msg:string
            })=>resp
            )
            );
  }

  //Actualizar Subsidio Medico
  actualizarAprobacion(aprobacion:aprobacion_Solicitud)
  {
    const url = `${base_url}/cebs/aprobacion`;
    return this.http.put(url,aprobacion)
          .pipe(
            map((resp:{
              ok:boolean, 
              msg:string
            })=>resp
            )
            );
  }

  //Anular Subsidio Medico
  anularAprobacion(aprobacion:aprobacion_Solicitud)
  {
    const url = `${base_url}/cebs/aprobacion/anular`;
    return this.http.put(url,aprobacion)
          .pipe(
            map((resp:{
              ok:boolean, 
              msg:string
            })=>resp
            )
            );
  }

  //Crear Liquidación Solicitud
  crearLiquidación(pago:liquidacion_Solicitud, ARCHIVO:File)
  {
    const fechaString = new Date(pago.FECHA_PAGO);

    const formData = new FormData();
      formData.append('ID_PAGO', pago.ID_PAGO.toString());
      formData.append('ID_REFERENCIA', pago.ID_REFERENCIA);
      formData.append('ESTADO', pago.ESTADO);
      formData.append('NUM_COMPROBANTE', pago.NUM_COMPROBANTE);
      formData.append('PAGADO', pago.PAGADO);
      formData.append('FECHA_PAGO', fechaString.toISOString());
      formData.append('OBSERVACION', pago.OBSERVACION);
      formData.append('USUARIO', pago.USUARIO);
      formData.append('ARCHIVO', ARCHIVO);

    const url = `${base_url}/cebs/liquidacion`;
    return this.http.post(url,formData)
          .pipe(
            map((resp:{
              ok:boolean, 
              msg:string
            })=>resp
            )
            );
  }

  //Obtener Liquidacion Solicitud
  cargarLiquidacionID(id:string)
  {
    const url = `${base_url}/cebs/liquidacion/${id}/`;
    return this.http.get(url)
    .pipe(
      map((resp:{
        ok:boolean, 
        registro:any
      })=>resp
      )
      );
  }

  //Anular Subsidio Medico
  anularLiquidacion(pago:liquidacion_Solicitud)
  {
    const url = `${base_url}/cebs/liquidacion/anular`;
    return this.http.put(url,pago)
          .pipe(
            map((resp:{
              ok:boolean, 
              msg:string
            })=>resp
            )
            );
  }
}
