import { Component, inject, OnInit } from '@angular/core';
import { listAsistenciaAsamb, tbl_Asamblea } from 'src/app/models/asamblea/asamblea';
import { AsambleaService } from 'src/app/services/asamblea.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss']
})
export class AsistenciaComponent implements OnInit {
  asistencia:listAsistenciaAsamb[]=[];
  asistenciaTemp:listAsistenciaAsamb[]=[];
  asamblea:tbl_Asamblea[]=[]
  asambleaid:number;
  cargando:boolean = false;
  pagina: number = 1;
  pagesize: number = 10;
  filtro:string = '';
  estadoAsamblea:string = '';

  private asambleaService=inject(AsambleaService)

  ngOnInit(): void {
    this.cargarAsamblea();
  }

  cargarAsamblea()
  {
    this.cargando = true;
    this.asambleaService.cargarAsambleasTodas()
    .subscribe((resp:any)=>{
      //console.log(resp)
      this.asamblea = resp;
      this.asambleaid = resp[0].ID_ASAMBLEA;
      this.cargarListaAsistencia(this.asambleaid);
      const opcionSeleccionada = this.asamblea.find(opcion => opcion.ID_ASAMBLEA == this.asambleaid);
    this.estadoAsamblea = opcionSeleccionada ? opcionSeleccionada.ESTADO : '';
    this.cargando = false;
    })
  }

  
  cargarListaAsistencia(id:number)
  {
    this.cargando = true;
    this.asambleaService.cargarListaAsistencia(id)
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      this.asistencia = resp.asistencia;
      this.asistenciaTemp = resp.asistencia;
      this.cargando = false;
    })
  }
  
  obtenerValorEstado(id:any)
  {
    this.asambleaid = id;
    const opcionSeleccionada = this.asamblea.find(opcion => opcion.ID_ASAMBLEA == this.asambleaid);
    this.estadoAsamblea = opcionSeleccionada ? opcionSeleccionada.ESTADO : '';  
    this.cargarListaAsistencia(this.asambleaid);
    
  }

  filtrar()
  {
    if(this.filtro)
      {
        var filter = new RegExp(this.filtro,'i');
        this.asistencia = this.asistenciaTemp.filter(x=>filter.test(x.NOMBRE_COMPLETO)||filter.test(x.IDENTIFICACION)
        ||filter.test((x.PALETA).toString())||filter.test(x.CONDICION))
      }
      else
      {
        this.asistencia = this.asistenciaTemp;
      }
  }

}
