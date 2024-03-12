import { Component, OnInit } from '@angular/core';
import { CreditoService } from 'src/app/services/credito.service';

@Component({
  selector: 'app-solicitudList',
  templateUrl: './solicitudList.component.html',
  styleUrls: ['./solicitudList.component.scss']
})
export class SolicitudListComponent implements OnInit {
  solicitud:[]=[];
  solicitudTemp:[]=[];
  estados:[]=[];
  public pagina: number = 1;
  public pagesize: number = 10;
  cargando:boolean = false;
  estadoSelected:number = 1;
  filtro = '';

  constructor(private creditoService: CreditoService) 
  {}

  ngOnInit(): void {
    this.cargarEstados();
  }

  cargarEstados()
  {
    this.cargando = true;
    this.creditoService.cargarEstadosSolicitudCredito()
    .subscribe((resp:any)=>
    {
      //console.log(resp);
      this.estadoSelected = resp[0].ID
      this.estados = resp;
      this.cargarSolicitudes();
      this.cargando = false;
    })
  }

  cargarSolicitudes()
  {

    this.creditoService.cargarSolicitudesCredito(this.estadoSelected)
    .subscribe((resp:any)=>
    {
      //console.log(this.estadoSelected);
      this.solicitud = resp;
      this.solicitudTemp = resp;
    })
  }

  filtrar()
  {
  }

  changeEstado(id:any)
  {
    this.estadoSelected = id;
    this.cargarSolicitudes();
  }

}
