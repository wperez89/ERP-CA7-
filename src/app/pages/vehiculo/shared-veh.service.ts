import { Injectable } from '@angular/core';
import { listaSolicitud } from 'src/app/models/vehiculos/tablasVehiculo.models';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Injectable({
  providedIn: 'root'
})
export class SharedVehService {
  public solicitud:listaSolicitud[]=[];
  public solicitudTemps:listaSolicitud[] =[];
  public estado:string = '';
  public cargando: boolean = true;
  public EstadoMenu:[]=[];

  constructor(private vehiculoService:VehiculoService) { }
  cargarSolicitudes()
  {
    this.cargando = true;
    //const estadoSelected = this.estado;
    this.vehiculoService.cargarSolicitudes(this.estado)
    .subscribe((resp:any)=>{
      this.solicitud = resp;
      this.solicitudTemps = resp;
      this.cargando = false;
      //console.log(this.solicitud);
    })
  }

  cargarEstadosSolicitud()
  {
    this.estado = '';
    this.vehiculoService.cargarEstadosSolicitud()
    .subscribe((resp:any)=>{
      if(resp.length>0)
      {
        this.EstadoMenu = resp;
      resp.forEach((item)=>{
        if(item.ESTADO==='PENDIENTE')
        {
          this.estado = item.ESTADO
        }        
      })
      if(!this.estado)
      {
        this.estado = resp[0].ESTADO
      }
      //console.log(this.estado)
      //this.estado = resp[0].ESTADO;
      this.cargarSolicitudes();
    }
    this.cargando = false;
    })
  }
  
}
