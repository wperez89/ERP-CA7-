import { Component, inject, OnInit } from '@angular/core';
import { delegadoActivos } from 'src/app/models/asamblea/asamblea';
import { AsambleaService } from 'src/app/services/asamblea.service';

@Component({
  selector: 'app-delegados',
  templateUrl: './delegados.component.html',
  styleUrls: ['./delegados.component.scss']
})

export class DelegadosComponent implements OnInit{
  delegados:delegadoActivos[]=[];
  delegadosTemp:delegadoActivos[]=[];
  cargando:boolean = false;
  pagina: number = 1;
  pagesize: number = 10;
  filtro:string = '';

  private asambleaService = inject(AsambleaService)

  ngOnInit(): void {
    this.cargarDelegadosActivos();
  }

  cargarDelegadosActivos()
  {
    this.cargando = true;
    this.asambleaService.cargarListaDelegados()
    .subscribe((resp:any)=>
    {
      this.delegados = resp;
      this.delegadosTemp = resp;
      this.cargando = false;
    })
  }

  filtrar()
  {
    if(this.filtro)
      {
        var filter = new RegExp(this.filtro,'i');
        this.delegados = this.delegadosTemp.filter(x=>filter.test(x.IDENTIFICACION_PROP)||filter.test(x.IDENTIFICACION_SUPL)
        ||filter.test((x.NOMBRE_PROP).toString())||filter.test(x.NOMBRE_SUPL))
      }
      else
      {
        this.delegados = this.delegadosTemp;
      }
  }

}
