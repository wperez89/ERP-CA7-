import { Component, OnInit } from '@angular/core';
import { listaSubsidioMed } from 'src/app/models/cebs/subsidio.models';
import { Estados } from 'src/app/models/global';
import { CebsService } from 'src/app/services/cebs.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-listasubsidios',
  templateUrl: './listasubsidios.component.html',
  styleUrls: ['./listasubsidios.component.scss']
})
export class ListasubsidiosComponent implements OnInit {
  public subsidios:listaSubsidioMed[] = [];
  public subsidiosTemp:listaSubsidioMed[] = [];
  public estados:Estados[];
  public stateOpcion: string = 'A';
  public pagado:boolean = false;
  public aprobado:boolean= false;
  public cargando:boolean = false;
  public pagina: number = 1;
  public pagesize: number = 10;
  public filtro = '';
  public presupuesto:number = 0;
  constructor(private cebsServices:CebsService, private globalService:GlobalService) { }

  ngOnInit(): void {
    this.cargarListaSubsidios();
    this.cargarEstado();
  }

  cargarListaSubsidios()
  {
    this.cargando = true;
    const aprobadoSub = this.aprobado;
    const pagadoSub= this.pagado;
    const estadoSub= this.stateOpcion;
    //console.log(aprobado, pagado, estado);
    console.log(typeof this.stateOpcion)
    this.cebsServices.cargarListaSubsidios(aprobadoSub, pagadoSub, estadoSub)
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      this.subsidios = resp.subsidio;
      this.subsidiosTemp = resp.subsidio;
      this.presupuesto = resp.presupuesto;
      this.cargando = false;
    })
  }
  
  cargarEstado()
  {
    this.globalService.cargarEstados()
    
    .subscribe((estados: Estados[])=>
    {
      this.estados = estados;
      //console.log(this.estados)
    })
  }

  obtenerValorEstado(value: string)
  {
    //console.log(value)
    this.stateOpcion = value;
    this.cargarListaSubsidios();
  }

  obtenerValorPagado(value: boolean)
  {
    this.pagado = value;
    //console.log(value)
    if(!value)
    {
      console.log("falso")
      this.aprobado = false;
      this.cargarListaSubsidios();
      return;
    }
    this.cargarListaSubsidios();
  }

  obtenerValorAprobado(value: boolean)
  {
    this.aprobado = value;
    if(this.aprobado)
    {
      this.pagado = true;
    }
    this.cargarListaSubsidios();
  }

  filtrar()
  {
    if(this.filtro)
    {
      var filter = new RegExp(this.filtro,'i');
      this.subsidios = this.subsidiosTemp.filter(item=>filter.test(item.ID_SUBSIDIO)||filter.test(item.NOMBRE)||
      filter.test(item.BENEFICIO));
    }
    else
    {
      this.subsidios = this.subsidiosTemp;
    }
  }

}
