import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';
import { rol } from 'src/app/interfaces/cargar-usuarios.interfaces';
import { MenuFrontService } from 'src/app/services/menu-front.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-rol-menu',
  templateUrl: './rol-menu.component.html',
  styleUrls: ['./rol-menu.component.scss']
})
export class RolMenuComponent implements OnInit {
  public opcionesMenu:[] =[];
  public opcionesMenuTemp:[] =[];
  public rol: rol[] = [];
  public variable:number = 1;
  public pagina: number = 1;
  public pagesize: number = 10;
  public cargando: boolean = true;
  public filtro = '';

  constructor(private usuarioService:UsuarioService, private menuservice: MenuFrontService, private router: Router) { }

  ngOnInit(): void {
    this.cargarRolUsuario();
    this.cargarOpcionesMenu();
  }

      //cargar Rol de Usuario
      cargarRolUsuario()
      {
        this.usuarioService.cargarRolUsuario()
        
        .subscribe((rol: rol[])=>
        {
          this.rol = rol;
          //console.log(this. rol)
        })
      }
      
  obtenerValorEstado(value: number)
  {
    this.cargando = true;
    this.variable = value;
    this.cargarOpcionesMenu();
  }

  cargarOpcionesMenu()
  {
    this.menuservice.cargaropcionesMenu(this.variable)
    .subscribe((resp:any)=>
    {
      this.cargando = true;
      //console.log(resp)
      this.opcionesMenu = resp;
      this.opcionesMenuTemp =resp;
      this.cargando = false
    })
  }

  desactivarOpcion(id:number)
  {
    this.menuservice.inactivateOpcionMenu(id,this.opcionesMenu)
    .subscribe((resp:any)=>
    {
      if(!resp.ok)
      {
        Toast.fire(
          {
            text:(resp.msg)
          }
        );
      }
      else
      {
        SuccessDialog.fire(
          {
            title:(resp.msg)
          });
          this.cargarOpcionesMenu();
          window.location.reload();
      }
    },
    (error) => { // Si sucede un error
        errorDialog.fire({
        title:error.msg
      })
    })
  }

  activarOpcion(id:number)
  {
    this.menuservice.activateOpcionMenu(id,this.opcionesMenu)
    .subscribe((resp:any)=>
    {
      if(!resp.ok)
      {
        Toast.fire(
          {
            text:(resp.msg)
          }
        );
      }
      else
      {
        SuccessDialog.fire(
          {
            title:(resp.msg)
          });
          this.cargarOpcionesMenu();
          window.location.reload();
      }
    },
    (error) => { // Si sucede un error
        errorDialog.fire({
        title:error.msg
      })
    })
  }

  filtrar()
  {}

}
