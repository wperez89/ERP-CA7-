import { Component, OnInit } from '@angular/core';
import { cupones } from 'src/app/models/marchamos/rifas';
import { MarchamoService } from 'src/app/services/marchamo.service';

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.component.html',
  styleUrls: ['./cupones.component.scss']
})
export class CuponesComponent implements OnInit {
  public cargando: boolean = true;
  public cupones: cupones[] = [];
  public cuponesTemp: cupones[] = [];
  public pagina: number = 1;
  public pagesize: number = 10;
  public filtro = '';
  constructor(private marchamoService:MarchamoService) { }

  ngOnInit(): void {
    this.cargarCupones();
  }

  cargarCupones()
  {
    this.cargando = true;
    this.marchamoService.cargarCupones()
     .subscribe((resp:any)=>
       {
        this.cupones = resp.cupones;
        this.cuponesTemp = resp.cupones;
        this.cargando = false;
       })
  }

  filtrar()
  {
    if(this.filtro)
    {
      var filter = new RegExp(this.filtro,'i');
      this.cupones = this.cuponesTemp.filter(item=>filter.test(item.PLACA)||filter.test(item.ID_CUPON));
    }
    else
    {
      this.cupones = this.cuponesTemp;
    }
  }

  
}
