import { Component, inject, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { AsambleaService } from 'src/app/services/asamblea.service';

@Component({
  selector: 'app-asamblea',
  templateUrl: './asamblea.component.html',
  styleUrls: ['./asamblea.component.scss'],

})
export class AsambleaComponent implements OnInit{
  
  totalDel:number = 0;
  primConv:number = 0;
  segundConv:number = 0;
  propietario:number = 0;
  suplente:number = 0;
  asisten:number = 0;
  faltanPrimConv:number = 0;
  faltaSegundaConv:number = 0;
  empezarPrimConv: string = 'NO';
  empezarSegConv: string = 'NO';
  asamblea: string = '';
  periodo: string = '';
  cargando:boolean = false;
  private asambleaService= inject(AsambleaService)
  ngOnInit(): void {
    this.cargarConvocatoria();
  }

  cargarConvocatoria()
  {
    this.cargando = true;
    this.asambleaService.cargarConvocatoria()
    .subscribe((resp:any)=>
    {
      this.totalDel = resp[0].cantidad;
      this.primConv = resp[0].primConv;
      this.segundConv = resp[0].segunda_conv;
      this.propietario = resp[0].propietarios;
      this.suplente = resp[0].suplentes;
      this.asisten = this.propietario + this.suplente;
      this.faltanPrimConv = this.primConv - this.asisten;
      this.faltaSegundaConv = this.segundConv - this.asisten;
      this.empezarPrimConv = this.faltanPrimConv < 0 ? 'SI' : 'NO'
      this.empezarSegConv = this.faltaSegundaConv < 0 ? 'SI' : 'NO'
      this.asamblea = resp[0].asamblea;
      this.periodo = resp[0].periodo;
      this.cargando = false;
    })
  }
}
