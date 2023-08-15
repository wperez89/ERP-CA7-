import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/User/menuFront.models';
import { MenuFrontService } from 'src/app/services/menu-front.service';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss']
})
export class MenuUsuarioComponent implements OnInit {
  public pagina: number = 1;
  public pagesize: number = 10;
  public menu: Menu[] = [];
  public menuTemp: Menu[] = [];
  public cargando: boolean = true;
  public filtro = '';
  constructor(private menuservice: MenuFrontService) { }

  ngOnInit(): void {
    this.cargarMainMenu();
  }

  cargarMainMenu()
  {
    this.menuservice.cargarMainMenu()
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      this.menu = resp
      this.menuTemp = resp
      this.cargando = false;
    })
  }
  
  filtrar()
  {
    if(this.filtro)
      {
        var filter = new RegExp(this.filtro,'i');
        this.menu = this.menuTemp.filter(item=>filter.test(item.TITLE)||filter.test(item.ICON))
      }
      else
      {
        this.menu = this.menuTemp;
      }
  }
}
