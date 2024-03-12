import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


import { listaSolicitud, trscnSolicitudVeh } from 'src/app/models/vehiculos/tablasVehiculo.models';
import { SharedVehService } from '../shared-veh.service';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/User/usuario.models';
import { Toast, errorDialog } from 'src/app/helpers/Notificaciones';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {
  public solicitud:listaSolicitud[]=[];
  public solicitudTemp:listaSolicitud[] =[];
  public EstadoMenu:[]=[];
  public transaccion: trscnSolicitudVeh[] = [];
  public usuario: Usuario;
  public pagina: number = 1;
  public pagesize: number = 10;
  public cargando: boolean = true;
  public filtro = '';
  public estado:string = 'PENDIENTE'

  constructor(private http: HttpClient, public sharedVeh:SharedVehService,private vehiculoService: VehiculoService,
    private usuarioservice:UsuarioService,) {
      this.usuario = usuarioservice.usuario;
    }

  ngOnInit(): void {
      //this.cargarEstadosSolicitud();
      this.sharedVeh.cargarEstadosSolicitud();
  }

  obtenerValorEstado(value: string)
  {
  
    this.sharedVeh.estado = value;
    this.sharedVeh.cargarSolicitudes();
  }

  filtrar()
  {
    if(this.filtro)
      {
        var filter = new RegExp(this.filtro,'i');
        this.solicitud = this.solicitudTemp.filter(x=>filter.test(x.SOLICITANTE)||filter.test(x.NUM_SOLICITUD))
      }
      else
      {
        this.solicitud = this.solicitudTemp;
      }
  }
  

  generarPDF(id:string) {
    this.cargando;
    const user = this.usuario.EMAIL.split('@')[0];
    this.vehiculoService.generarPDF(id,user).subscribe(
      (pdfBlob: Blob) => {
        // Crear un objeto URL para el blob
        const url = window.URL.createObjectURL(pdfBlob);
        // Abrir el PDF en una nueva pestaña
        window.open(url);
        this.cargando = false;
      },
      (error) => {
        Toast.fire(
          {
            text:("Error al Generar PDF. Consulte al Administrador")
          }
          )
      }
    );
  }
}
