import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/User/menuFront.models';
import { MenuFrontService } from 'src/app/services/menu-front.service';

@Component({
  selector: 'app-submenu-usuario',
  templateUrl: './submenu-usuario.component.html',
  styleUrls: ['./submenu-usuario.component.scss']
})
export class SubmenuUsuarioComponent implements OnInit {
  public pagina: number = 1;
  public pagesize: number = 10;
  public submenu: Menu[] = [];
  public submenuTemp: Menu[] = [];
  public cargando: boolean = true;
  public filtro = '';

  constructor(private menuservice: MenuFrontService) { }

  ngOnInit(): void {
    this.cargarSubMenu();
  }

  cargarSubMenu()
  {
    this.cargando = true;
    this.menuservice.cargarSubMenu()
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      this.submenu = resp;
      this.submenuTemp = resp;
      this.cargando = false;
    })
  }
  
  filtrar()
  {
    if(this.filtro)
      {
        var filter = new RegExp(this.filtro,'i');
        this.submenu = this.submenuTemp.filter(item=>filter.test(item.TITLE)||filter.test(item.PARENT_TITLE))
      }
      else
      {
        this.submenu = this.submenuTemp;
      }
  }

}
