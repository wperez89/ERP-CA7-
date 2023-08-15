import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';
import { rol } from 'src/app/interfaces/cargar-usuarios.interfaces';
import { MenuFrontService } from 'src/app/services/menu-front.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-edit-rol-menu',
  templateUrl: './edit-rol-menu.component.html',
  styleUrls: ['./edit-rol-menu.component.scss']
})
export class EditRolMenuComponent implements OnInit {
  public rolmenuForm:FormGroup
  cargando: boolean = false;
  public rol: rol[] = [];
  public opciones:[] =[];
  public rolSelect: number = 1
  public seleccionado:number[] =[];

  constructor(private usuarioService:UsuarioService, private menuservice: MenuFrontService, private router: Router,
    private fb:FormBuilder) 
  {
    this.rolmenuForm= this.fb.group(
      {
        ID_ROLUSER:[1],
        ID_MENU:[this.fb.array([]),Validators.required],
        ESTADO:['A'],
      })
  }

  ngOnInit(): void {
    this.cargarRolUsuario();
    this.cargarOpcionesNoHabilitadas();
  }

  //cargar Rol de Usuario
  cargarRolUsuario()
  {
    this.cargando = true;
    this.usuarioService.cargarRolUsuario()
    
    .subscribe((rol: rol[])=>
    {
      this.rol = rol;
      //console.log(this. rol)
      this.cargando = false;
    })
  }

  obtenerValorRol(value: number)
  {
    this.rolSelect = value;
    this.seleccionado = [];
    this.rolmenuForm.patchValue({ ID_MENU: this.seleccionado,ID_ROLUSER:this.rolSelect});
    this.cargarOpcionesNoHabilitadas();
  }

   //cargar Rol de Usuario
   cargarOpcionesNoHabilitadas()
   {
    this.cargando = true;
     this.menuservice.cargaropcionesNOhabilitadas(this.rolSelect)
     .subscribe((resp:any)=>
     {
      //console.log(resp)
       this.opciones = resp;
       //console.log(this. rol)
       this.cargando = false;
     })
   }

   createopcionMenu()
   {
    this.rolmenuForm.patchValue({ ID_MENU: this.seleccionado });
     //console.log(this.seleccionado)
     
    this.menuservice.crearOpcionRoleMenu(this.rolmenuForm.value)
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
          this.rolmenuForm.reset();
          this.router.navigate(['/usuario/usermainmenu']);
      }
    },
    (error) => { // Si sucede un error
        errorDialog.fire({
        title:error.msg
      })
    })
   }

   verificar(id:number):void
   {
    let pos = this.seleccionado.indexOf(id);
    if(pos === -1)
    {
      this.seleccionado.push(id)
    }
    else
    {
      this.seleccionado.splice(pos,1)
    }
   }

}
