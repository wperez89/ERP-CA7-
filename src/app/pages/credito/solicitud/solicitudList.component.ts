import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudCred } from 'src/app/models/credito/credito.models';
import { CreditoService } from 'src/app/services/credito.service';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-solicitudList',
  templateUrl: './solicitudList.component.html',
  styleUrls: ['./solicitudList.component.scss']
})
export class SolicitudListComponent implements OnInit {
  solicitud:SolicitudCred[]=[];
  solicitudTemp:SolicitudCred[]=[];
  estados:[]=[];
  public pagina: number = 1;
  public pagesize: number = 10;
  cargando:boolean = false;
  estadoSelected:number = 1;
  filtro = '';
  id = 1234;

  constructor(private creditoService: CreditoService, private cryptoService:CryptoService, private router: Router,) 
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
      if(resp.length > 0)
      {
        this.estadoSelected = resp[0].ID
        this.estados = resp;
        this.cargarSolicitudes();
      }
      else
      {
        this.estadoSelected = 0;
        this.solicitud = [];
      }

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
    if(this.filtro)
      {
        var filter = new RegExp(this.filtro,'i');
        this.solicitud = this.solicitudTemp.filter(x=>filter.test(x.NOMBRE)||filter.test(x.ID_SOLICITUD))
      }
      else
      {
        this.solicitud = this.solicitudTemp;
      }
  }

  changeEstado(id:any)
  {
    this.estadoSelected = id;
    this.cargarSolicitudes();
  }

  getLink(solicitud:string, client:string, estado:number)  {
    //routerLink="//credito/solicitud/edit/{{x.ID_SOLICITUD}}/{{x.ESTADO_ACTUAL}}/{{x.ID_CLIENTE}}"
    //:id/:estado/:cliente
    //console.log(this.solicitud)
    const id = this.cryptoService.encrypt(solicitud);
    const cliente = this.cryptoService.encrypt(client);
    this.router.navigate([`//credito/solicitud/edit/${id}/${estado}/${cliente}`]) 
  }

}
