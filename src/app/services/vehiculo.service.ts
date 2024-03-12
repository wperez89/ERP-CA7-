import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import {
  SolicitudVeh,
  VehiculoLista,
  aprobadoresSolVeh,
  conductor,
  pasajerosVeh,
  trscnSolicitudVeh,
} from "../models/vehiculos/tablasVehiculo.models";

const base_url = environment.base_urlSql;

@Injectable({
  providedIn: "root",
})
export class VehiculoService {
  constructor(private http: HttpClient) {}

  cargarListaVehiculos() {
    const url = `${base_url}/vehiculo/lista`;
    //console.log(url)
    return this.http
      .get(url)
      .pipe(
        map((resp: { ok: boolean; vehiculo: VehiculoLista }) => resp.vehiculo)
      );
  }

  cargarVehiculoID(id: number) {
    const url = `${base_url}/vehiculo/lista/${id}`;
    //console.log(url)
    return this.http
      .get(url)
      .pipe(
        map((resp: { ok: boolean; vehiculo: VehiculoLista }) => resp.vehiculo)
      );
  }

  crearVehiculoFlotilla(datos: VehiculoLista) {
    //console.log(datos);
    const url = `${base_url}/vehiculo/lista`;
    return this.http
      .post(url, datos)
      .pipe(
        map(
          (resp: { ok: boolean; Vehiculo: VehiculoLista; msg: string }) => resp
        )
      );
  }

  cargarTipoLicencias() {
    const url = `${base_url}/vehiculo/tablas/TipoLic`;
    //console.log(url)
    return this.http
      .get(url)
      .pipe(map((resp: { ok: boolean; tipoLic: any }) => resp.tipoLic));
  }

  cargarMotivoSalidaVeh() {
    const url = `${base_url}/vehiculo/tablas/motivoSal`;
    //console.log(url)
    return this.http
      .get(url)
      .pipe(map((resp: { ok: boolean; motivo: any }) => resp.motivo));
  }

  cargarEstadosSolicitud() {
    const url = `${base_url}/vehiculo/tablas/estadosolic`;
    //console.log(url)
    return this.http
      .get(url)
      .pipe(map((resp: { ok: boolean; estado: any }) => resp.estado));
  }

  cargarEstadosTodos() {
    const url = `${base_url}/vehiculo/tablas/estadosolicAll`;
    //console.log(url)
    return this.http
      .get(url)
      .pipe(map((resp: { ok: boolean; estado: any }) => resp.estado));
  }

  crearConductor(datos: conductor, IMG: File, EDITADO: boolean) {
    //console.log(IMG);
    const fechaVenceString = new Date(datos.VENCIMIENTO);
    const fechaExpedString = new Date(datos.EXPEDICION);
    const formData = new FormData();

    if ((EDITADO == true)) {
      formData.append("ID_PERSONA", datos.ID_PERSONA);
      formData.append("ID_CONDUCTOR", datos.ID_CONDUCTOR.toString());
      formData.append("TIPO_LIC", datos.TIPO_LIC);
      formData.append("OBSERVACION", datos.OBSERVACION);
      formData.append("ID", datos.ID);
      formData.append("VENCIMIENTO", fechaVenceString.toISOString());
      formData.append("EXPEDICION", fechaExpedString.toISOString());
      formData.append("ESTADO", datos.ESTADO);
      formData.append("IMG", IMG);
      formData.append("EDITADO", EDITADO.toString());
    } 
    else {
      formData.append("ID_PERSONA", datos.ID_PERSONA);
      formData.append("TIPO_LIC", datos.TIPO_LIC);
      formData.append("OBSERVACION", datos.OBSERVACION);
      formData.append("ID", datos.ID);
      formData.append("VENCIMIENTO", fechaVenceString.toISOString());
      formData.append("EXPEDICION", fechaExpedString.toISOString());
      formData.append("ESTADO", datos.ESTADO);
      formData.append("IMG", IMG);
      formData.append("EDITADO", EDITADO.toString());
    }

    console.log(datos);

    const url = `${base_url}/vehiculo/chofer`;
    //console.log(url)
    return this.http
      .post(url, formData)
      .pipe(map((resp: { ok: boolean; msg: string }) => resp));
  }

  cargarChofer() {
    const url = `${base_url}/vehiculo/chofer`;
    //console.log(url)
    return this.http
      .get(url)
      .pipe(map((resp: { ok: boolean; choferes: conductor }) => resp.choferes));
  }

  cargarChoferID(id: number) {
    const url = `${base_url}/vehiculo/chofer/${id}`;
    //console.log(url)
    return this.http
      .get(url)
      .pipe(map((resp: { ok: boolean; choferes: conductor }) => resp.choferes));
  }

  cargarAprobadores(estado: String) {
    const url = `${base_url}/vehiculo/aprobador/${estado}`;
    //console.log(url)
    return this.http
      .get(url)
      .pipe(map((resp: { ok: boolean; aprobador: any }) => resp.aprobador));
  }

  cargarAprobadorID(id: number) {
    const url = `${base_url}/vehiculo/aprobadorid/${id}`;
    //console.log(url)
    return this.http
      .get(url)
      .pipe(map((resp: { ok: boolean; aprobador: any }) => resp.aprobador));
  }

  crearAprobador(datos: aprobadoresSolVeh) {
    //console.log(datos);
    const url = `${base_url}/vehiculo/aprobador`;
    return this.http
      .post(url, datos)
      .pipe(
        map(
          (resp: { ok: boolean; msg: string }) => resp
        )
      );
  }

  crearSolicitud(datos: SolicitudVeh) {
    //console.log(datos);
    const url = `${base_url}/vehiculo/solicitud`;
    return this.http
      .post(url, datos)
      .pipe(
        map(
          (resp: { ok: boolean; msg: string }) => resp
        )
      );
  }

  cargarSolicitudes(estado: String) {
    const url = `${base_url}/vehiculo/solicitud/${estado}`;
    //console.log(url)
    return this.http
      .get(url)
      .pipe(map((resp: { ok: boolean; lista: any }) => resp.lista));
  }

  cargarSolicitudID(estado: number,id:string,solicitante:string) {
    const url = `${base_url}/vehiculo/solicitudid/${estado}/${id}/${solicitante}`;
    //console.log(url)
    return this.http
      .get(url)
      .pipe(map((resp: { ok: boolean; lista: any }) => resp.lista));
  }

  crearPasajeros(datos: pasajerosVeh) {
    //console.log(datos);
    const url = `${base_url}/vehiculo/pasajero`;
    return this.http
      .post(url, datos)
      .pipe(
        map(
          (resp: { ok: boolean; msg: string }) => resp
        )
      );
  }

  cargarPasajerosIDViaje(id:string) {
    const url = `${base_url}/vehiculo/pasajero/${id}`;
    //console.log(url)
    return this.http
      .get(url)
      .pipe(map((resp: { ok: boolean; pasajero: pasajerosVeh }) => resp.pasajero));
  }

  cargarPasajerosID(id:number) {
    const url = `${base_url}/vehiculo/pasajero/viaje/${id}`;
    //console.log(url)
    return this.http
      .get(url)
      .pipe(map((resp: { ok: boolean; pasajero: pasajerosVeh }) => resp.pasajero));
  }

  cargartrscnSolVehID(id:string) {
    const url = `${base_url}/vehiculo/transaccion/${id}`;
    //console.log(url)
    return this.http
      .get(url)
      .pipe(map((resp: { ok: boolean; transaccion: trscnSolicitudVeh }) => resp.transaccion));
  }

  cargarIDTrscn(id:number) {
    const url = `${base_url}/vehiculo/transaccion/num_solic/${id}`;
    //console.log(url)
    return this.http
      .get(url)
      .pipe(map((resp: { ok: boolean; transaccion: trscnSolicitudVeh }) => resp.transaccion));
  }

  crearTransaccionSolVeh(datos: trscnSolicitudVeh) {
    //console.log(datos);
    const url = `${base_url}/vehiculo/transaccion`;
    return this.http
      .post(url, datos)
      .pipe(
        map(
          (resp: { ok: boolean; msg: string }) => resp
        )
      );
  }

  enviarNotificacion(id:string) {
    const url = `${base_url}/vehiculo/notificacion/${id}`;
    //console.log(url)
    return this.http
      .post(url,id)
      .pipe(map((resp: { ok: boolean; msg: string }) => resp));
  }

  generarPDF(id:string, user:string): Observable<Blob>{
      const url = `${base_url}/vehiculo/solicitud-pdf/${id}/${user}`;
      return this.http.get(url, { responseType: 'blob' });
    }
}
